// @ts-ignore
import { css } from '@xstyled/styled-components';
import { SizesType } from '../enums/SizesType';
import { Sizes, Media } from './types';

const sizes: Sizes = {
  megaMonitor: 2800,
  ultramonitor: 1920,
  wideMonitor: 1680,
  monitor: 1440,
  narrowMonitor: 1240,
  desktop: 1024,
  tablet: 821,
  tabletS: 550,
  phone: 430,
  phoneS: 376,
  phoneXS: 321,
};

const comparatorArray = Object.keys(sizes).sort((first: string, second: string) => {
  if (sizes[first as SizesType] < sizes[second as SizesType]) {
    return -1;
  } else if (sizes[first as SizesType] > sizes[second as SizesType]) {
    return 1;
  } else {
    return 0;
  }
});

export const comparatorFunction = (first: Media, second: Media): boolean => {
  let equals = false;
  for (let i = 0; i < comparatorArray.length; i++) {
    const currentIndex = comparatorArray[i] as SizesType;
    if (first[currentIndex] && second[currentIndex]) {
      equals = true;
      break;
    } else if (first[currentIndex] !== second[currentIndex]) {
      break;
    }
  }
  return equals;
};

export const media = Object.keys(sizes as Sizes).reduce((acc: any, label: string) => {
  acc[label] = (...args: string[]) => css`
    @media (max-width: ${(sizes as Sizes)[label as SizesType] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const inlineMedia = (breakpoint: number) => (...styles: any[]) => {
  return css`
    @media (min-width: ${breakpoint / 16}em) {
      ${css(...styles)};
    }
  `;
};

export const mediaType: Media = Object.keys(sizes as Sizes).reduce((acc: any, label: string) => {
  acc[label] = window.matchMedia(`(max-width: ${(sizes as Sizes)[label as SizesType]}px)`).matches;
  return acc;
}, {});

export const getMediaType = (): Media => {
  return Object.keys(sizes as Sizes).reduce((acc: any, label: string) => {
    acc[label] = window.matchMedia(`(max-width: ${(sizes as Sizes)[label as SizesType]}px)`).matches;
    return acc;
  }, {});
};
