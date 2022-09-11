import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const SpecialLScreen = () => {
    return (
        <Container>
            <Text>Special Screen</Text>
        </Container>
    )
}
export default SpecialLScreen

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
