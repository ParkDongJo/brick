import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import useDeviceInfo from './../hooks/useDeviceInfo';

const SettingScreen = () => {
  const {
    deviceName,
    deviceId,
    brand,
    batteryLevel,
    osName,
    osVer,
    appVer,
    uniqueId,
    maxMemory,
    totalMemory,
  } = useDeviceInfo();
  return (
    <Container>
      <Text>deviceName: {deviceName}</Text>
      <Text>deviceId: {deviceId}</Text>
      <Text>brand: {brand}</Text>
      <Text>batteryLevel: {batteryLevel}</Text>
      <Text>osName: {osName}</Text>
      <Text>osVer: {osVer}</Text>
      <Text>appVer: {appVer}</Text>
      <Text>appVer: {maxMemory}</Text>
      <Text>totalMemory: {totalMemory}</Text>
      <Text>uniqueId: {uniqueId}</Text>
    </Container>
  );
};
export default SettingScreen;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
