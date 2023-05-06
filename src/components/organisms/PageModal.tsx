import React from 'react';
import {View, Modal, Button, SafeAreaView} from 'react-native';
import styled from 'styled-components';

const PageModal: React.FC<Props> = props => {
  const {visible, children, hasHeader = true, close} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        close?.();
      }}>
      <Container>
        <Center>
          <Body>
            {hasHeader && (
              <Header>
                <Button title="취소" onPress={close} />
              </Header>
            )}
            {children}
          </Body>
        </Center>
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
  hasHeader?: boolean;
  children: React.ReactNode;
  close?(): void;
};

const Container = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Center = styled(View)`
    width: 100%;
    backgroundColor: white;
    borderRadius: 20px;
    padding: 10px 20px;
    alignItems: center;
    shadow-color: #000;
    shadow-offset: {
        width: 0px,
        height: 1px
    };
    shadow-opacity: 0.09;
    shadow-radius: 4px;
    elevation: 5;
`;
const Header = styled(View)`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
`;
const Body = styled(View)`
  width: 100%;
  height: 100%;
`;
