import React from "react";
import { View, Text } from "react-native"
import styled from "styled-components"
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from "./../App"

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { screenId } = route.params;
    return (
        <Container>
          <Text>Detail Screen {screenId}</Text>
        </Container>
    );
}
export default DetailScreen;

type Props = {
    route: RouteProp<StackParamList, 'Detail'>;
} & NativeStackScreenProps<StackParamList>

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
