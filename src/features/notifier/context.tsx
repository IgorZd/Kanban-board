import React, { createContext, useState, useContext } from 'react';
import { SnackbarProvider } from 'notistack';
import { withStyles } from '@material-ui/core';
import { NotifierContextProviderType, NotifierData } from './types';
// @ts-ignore
import styled from '@xstyled/styled-components';

const commonStyles = {
  maxWidth: '485px',
  fontSize: '14px',
  fontFamily: 'Poppins',
  padding: '6px 42px 6px 10px',
};

const snackbarStyles = {
  success: { backgroundColor: '#269E39 !important', ...commonStyles },
  error: { backgroundColor: '#F44450 !important', ...commonStyles },
  warning: { backgroundColor: '#ED7A11 !important', ...commonStyles },
  info: {
    backgroundColor: '#5084F0 !important',
    ...commonStyles,
  },
  containerRoot: { zIndex: 15000000000000 },
};

const StyledSvg = styled.svg`
  margin-right: 13px;
`;

const DEFAULT_STATE = {
  nextKey: -1,
  list: [],
};

const NotifierContext = createContext([DEFAULT_STATE, null as any, null as any] as NotifierContextProviderType);

const useNotifierContextCreator = (): NotifierContextProviderType => {
  const [notifierState, setNotifierState] = useState<NotifierData>(DEFAULT_STATE);

  const addNotification = (notification = { message: 'Hello', type: 'info', elementRef: 'alo' }) => {
    setNotifierState((value: any) => {
      const key = value.nextKey + 1;
      return { ...value, nextKey: key, list: [{ key, ...notification }, ...value.list] };
    });
  };

  const removeNotification = (key: any) => {
    setNotifierState((value) => {
      const newList = value.list.filter((notification: any) => notification.key !== key);
      return { ...value, list: newList };
    });
  };

  //@TODO Alex work on this object
  const functions = { addNotification, removeNotification };

  return [notifierState, setNotifierState, functions];
};

const NotifierContextProvider = ({ classes, children }: { classes: any; children: any }) => {
  const provider = useNotifierContextCreator();

  return (
    <SnackbarProvider
      iconVariant={{
        success: (
          <StyledSvg width="28" height="28" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 21.125C17.4873 21.125 21.125 17.4873 21.125 13C21.125 8.51269 17.4873 4.875 13 4.875C8.51269 4.875 4.875 8.51269 4.875 13C4.875 17.4873 8.51269 21.125 13 21.125Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.1365 10.292L11.449 15.9795L8.86377 13.3943"
              stroke="white"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </StyledSvg>
        ),
        error: (
          <StyledSvg width="28" height="28" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 21.125C17.4873 21.125 21.125 17.4873 21.125 13C21.125 8.51269 17.4873 4.875 13 4.875C8.51269 4.875 4.875 8.51269 4.875 13C4.875 17.4873 8.51269 21.125 13 21.125Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M15.4375 10.5625L10.5625 15.4375" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.5625 10.5625L15.4375 15.4375" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          </StyledSvg>
        ),
        warning: '',
        info: (
          <StyledSvg width="28" height="28" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 21.125C17.4873 21.125 21.125 17.4873 21.125 13C21.125 8.51269 17.4873 4.875 13 4.875C8.51269 4.875 4.875 8.51269 4.875 13C4.875 17.4873 8.51269 21.125 13 21.125Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M13 16.25V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M13 9.75H13.0078"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </StyledSvg>
        ),
      }}
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
        containerRoot: classes.containerRoot,
      }}
    >
      <NotifierContext.Provider value={provider}>{children}</NotifierContext.Provider>
    </SnackbarProvider>
  );
};

export const useNotifierContext = () => {
  const service = useContext(NotifierContext);

  if (!service) {
    throw new Error('Notifier Context is unavailable');
  }

  return service;
};

export const useNotifierFunctions = () => {
  const service = useContext(NotifierContext);

  if (!service) {
    throw new Error('Notifier Context is unavailable');
  }

  return service[2];
};

export const withNotifierContext = (Component: any) => {
  return function WithNotifierContext(props: any) {
    const service = useNotifierContext();
    return <Component {...props} notifierContext={service} />;
  };
};

export default withStyles(snackbarStyles)(NotifierContextProvider);
