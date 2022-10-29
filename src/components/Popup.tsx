import { Modal } from "react-native";
import React from "react";
import styled from "styled-components/native";

export interface PopupProps {
  children?: React.ReactNode;
  showModal?: boolean;
  hideModal: () => void;
}

const Popup = ({ children, showModal, hideModal }: PopupProps) => {
  return (
    <Modal
      onRequestClose={hideModal}
      transparent={true}
      animationType="fade"
      visible={showModal}
    >
      <PopupWraper onPress={hideModal} activeOpacity={1}>
        <StyledPopup activeOpacity={1}>{children}</StyledPopup>
      </PopupWraper>
    </Modal>
  );
};

const PopupWraper = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledPopup = styled.TouchableOpacity`
  width: 85%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  padding: 24px;
  border-radius: 16px;
`;

export default Popup;
