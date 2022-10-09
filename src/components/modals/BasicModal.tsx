import React, {
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const BasicModal: ForwardRefRenderFunction<Handle, Props> = (props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
    }),
    [],
  );

  return (
    <Modal isVisible={isModalVisible}>
      <View style={{flex: 1}}>
        <Text>Hello!</Text>
        <Button title="Hide modal" onPress={hide} />
      </View>
    </Modal>
  );
};

export default forwardRef(BasicModal);

export type Handle = {
  show(): void;
  hide(): void;
};
type Props = {};
