import React, { Fragment, useState, useEffect } from "react";
import { withSnackbar } from "notistack";
import { useNotifierContext, useNotifierFunctions } from "./context";
// @ts-ignore
import { ReactComponent as CloseImage } from "../../assets/Cancel.svg";
// @ts-ignore
import styled from "@xstyled/styled-components";

const StyledCloseImage = styled(CloseImage)`
  height: 25px;
  width: 25px;
  position: absolute;
  top: 10px;
  right: 12px;
  & > path {
    stroke: white;
  }
  &:hover {
    transition: all 0.3s linear;
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Notifier = (props: any) => {
  const [displayed, setDisplayed] = useState<any>([]);
  const [{ list: notifications }] = useNotifierContext();
  const { removeNotification } = useNotifierFunctions();

  //Fragment 'elementRef' needed to put any component you want to notification
  useEffect(() => {
    const action = (key: any, elementRef: any) => (
      <>
        <Fragment>{elementRef && elementRef()}</Fragment>
        <Fragment>
          <StyledCloseImage
            onClick={() => {
              props.closeSnackbar(key);
            }}
          />
        </Fragment>
      </>
    );
    notifications.map((notification: any) =>
      setTimeout(() => {
        // If notification already displayed, abort
        if (
          displayed.filter((key: any) => key === notification.key).length > 0
        ) {
          return;
        }

        // Display notification using Snackbar
        props.enqueueSnackbar(notification.message, {
          variant: notification.type,
          anchorOrigin: { horizontal: "left", vertical: "top" },
          action: (key: any) => action(key, notification.elementRef),
        });
        // Add notification's key to the local state
        setDisplayed([...displayed, notification.key]);
        // Dispatch action to remove the notification from the redux store
        removeNotification(notification.key);
      }, 300)
    );
  }, [notifications, removeNotification, displayed, props]);

  return null;
};

export default withSnackbar(Notifier);
