import React from 'react';
import NotifierContextProvider, { useNotifierFunctions } from './context';
import Notifier from './Notifier';

export const NotifierProvider = ({ children }: { children: any }) => {
  return (
    <NotifierContextProvider>
      {children}
      <Notifier />
    </NotifierContextProvider>
  );
};

export { useNotifierFunctions };
