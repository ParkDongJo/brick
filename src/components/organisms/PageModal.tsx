import React from 'react';
import {View, Modal} from 'react-native';
import styled from 'styled-components';

const PageModal: React.FC<Props> = props => {
  const {visible, children, close} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        close();
      }}>
      <Container>
        <Center>{children}</Center>
      </Container>
    </Modal>
  );
};

export default PageModal;

export type Handle = {
  show(): void;
  hide(): void;
};
type Props = {
  visible: boolean;
  children: React.ReactNode;
  close(): void;
};

const Container = styled(View)`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Center = styled(View)`
    width: 100%;
    height: 100%;
    margin: 20px;
    backgroundColor: white;
    borderRadius: 20px;
    padding: 10px 20px;
    alignItems: center;
    shadow-color: #000;
    shadow-offset: {
        width: 0px,
        height: 1px
    };
    shadow-opacity: 0.15;
    shadow-radius: 4px;
    elevation: 5;
`;
