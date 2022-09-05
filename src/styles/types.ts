import { Dispatch, SetStateAction } from 'react';
import { SizesType } from '../enums/SizesType';
import { mediaType } from './media';

export type StyleState = {
  mediaType: typeof mediaType;
};

export type StyleContextProviderType = [StyleState, Dispatch<SetStateAction<StyleState>>];

export type Sizes = {
  [key in SizesType]: number;
};

export type Media = {
  [key in SizesType]: boolean;
};
