import React, { useLayoutEffect } from "react";
import { View, Text, Button, Alert } from "react-native"
import styled from "styled-components"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenStackParamList } from "./IndexScreen"
import LogoTitle from "./../components/LogoTitle"

const MainScreen: React.FC<Props> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (_props) => <LogoTitle />,
      headerRight: () => (
        <Button onPress={() => console.log("Test")} title="Update count" />
      ),
    });
  }, [navigation]);

  const handleClick = () => {
    navigation.navigate('Detail', { screenId : 1 })
  }
  return (
      <Container>
        <Text>Main Screen</Text>
        <Button title={"Move to Detail"} onPress={handleClick} />
      </Container>
  );
}
export default MainScreen;

type Props = {
} &  NativeStackScreenProps<ScreenStackParamList, 'Main'>

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
