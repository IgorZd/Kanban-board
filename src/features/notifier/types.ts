import { Dispatch, SetStateAction } from 'react';

export type NotifierData = {
  nextKey: number;
  list: any[];
};

export type NotifierFunctions = {
  addNotification: any;
  removeNotification: any;
};

export type NotifierContextProviderType = [
  NotifierData,
  Dispatch<SetStateAction<NotifierData>> | null,
  NotifierFunctions,
];
