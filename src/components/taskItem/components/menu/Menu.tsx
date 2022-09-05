import React, { useCallback, useEffect, useRef, useState } from "react";
// @ts-ignore
import styled, { useTheme } from "@xstyled/styled-components";
import { ReactComponent as Dots } from "../../../../assets/menu.svg";
import { MenuPopup } from "../menuPopup/MenuPopup";
import { ReactComponent as SaveIcon } from "../../../../assets/accept.svg";
import { ReactComponent as CancelIcon } from "../../../../assets/Cancel.svg";
import { SaveCloseButton } from "../saveCloseButton/SaveCloseButton";

const Wrapper = styled.div`
  position: relative;
`;
const Button = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  cursor: pointer;

  & > svg {
    transform: rotate(90deg);
    & > g > path {
      fill: ${(props: any) => props.theme.colors.gray2};
      transition: all 0.3s linear;
    }
  }
  &:hover {
    & > svg > g > path {
      fill: ${(props: any) => props.theme.colors.gray1};
    }
  }
`;
const ActionsWrapper = styled.div`
  display: flex;
  & > button:first-child {
    margin-right: 8px;
  }
`;

export const Menu = ({
  isEditingInProcess,
  editOnClick,
  saveOnClick,
  cancellOnClick,
  deleteOnClick,
  isEditingAvailable,
  ...props
}: {
  isEditingInProcess: boolean;
  editOnClick: () => void;
  saveOnClick: () => void;
  cancellOnClick: () => void;
  deleteOnClick: () => void;
  isEditingAvailable: boolean;
  className?: string;
}) => {
  const theme = useTheme();
  const { gray1, gray2, green, green1 } = theme.colors;
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const popupRef = useRef<any>(null);

  const openPopUp = () => {
    isEditingAvailable && setIsOpenPopup(true);
  };
  const handleEditOnClick = () => {
    editOnClick();
    setIsOpenPopup(false);
  };
  const handleDeleteOnClick = () => {
    setIsOpenPopup(false);
    deleteOnClick();
  };

  const outsideHandler = useCallback(
    (e: any) => {
      if (
        isOpenPopup &&
        popupRef.current &&
        !popupRef.current.contains(e.target)
      ) {
        setIsOpenPopup(false);
      }
    },
    [isOpenPopup]
  );

  const saveCloseArr = [
    {
      onClick: saveOnClick,
      icon: () => <SaveIcon />,
      color: green,
      hoverColor: green1,
    },
    {
      onClick: cancellOnClick,
      icon: () => <CancelIcon />,
      color: gray2,
      hoverColor: gray1,
    },
  ];

  useEffect(() => {
    window.addEventListener("click", outsideHandler);
    return () => {
      window.removeEventListener("click", outsideHandler);
    };
  }, [outsideHandler]);

  return (
    <Wrapper {...props}>
      {isEditingInProcess ? (
        <ActionsWrapper>
          {saveCloseArr.map((item: any, index: number) => {
            const { onClick, icon, color, hoverColor } = item;
            return (
              <SaveCloseButton
                key={index}
                onClick={onClick}
                icon={icon}
                color={color}
                hoverColor={hoverColor}
              />
            );
          })}
        </ActionsWrapper>
      ) : (
        <Button onClick={openPopUp}>
          <Dots />
        </Button>
      )}
      {isOpenPopup && (
        <MenuPopup
          editOnClick={handleEditOnClick}
          deleteOnClick={handleDeleteOnClick}
          popupRef={popupRef}
        />
      )}
    </Wrapper>
  );
};
