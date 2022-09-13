import react from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const AboutScreen = () => {
    return (
        <Container>
            <Text>About page</Text>
        </Container>
    )
}
export default AboutScreen;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
