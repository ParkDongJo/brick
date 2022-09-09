import React from "react";
import { View, Text, Button } from "react-native"
import styled from "styled-components"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from "./../App"

const MainScreen: React.FC<Props> = ({ navigation }) => {
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
} &  NativeStackScreenProps<StackParamList, 'Main'>

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
