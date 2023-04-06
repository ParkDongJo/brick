import React, {
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Button, Text, View, Modal} from 'react-native';
import styled from 'styled-components';

const AlertModal: ForwardRefRenderFunction<Handle, Props> = (props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  useImperativeHandle(ref, () => ({show, hide}), []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        hide();
      }}>
      <Container>
        <Center>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={hide} />
        </Center>
      </Container>
    </Modal>
  );
};

export default forwardRef(AlertModal);

export type Handle = {
  show(): void;
  hide(): void;
};
type Props = {};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const Center = styled(View)`
  margin: 20px;
  backgroundColor: white;
  borderRadius: 20px;
  padding: 35px;
  alignItems: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0px,
    height: 2px
  };
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;
