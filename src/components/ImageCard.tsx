import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components';

const ImageCard = (props: Props) => {
  const {title, subText, imageUrl} = props;
  return (
    <Container>
      <CardImage source={{uri: imageUrl}} />
      <Title>{title}</Title>
      <SubText>{subText}</SubText>
    </Container>
  );
};
export default ImageCard;

type Props = {
  title: string;
  subText: string;
  imageUrl: string;
};

const Container = styled(View)`
  background-color: '#f9c2ff';
  padding: 10px 5px;
  margin-vertical: 8px;
  margin-horizontal: 16px;
  background-color: yellow;
`;
const CardImage = styled(Image)`
  width: 200px;
  height: 200px;
  background-color: green;
`;
const Title = styled(Text)`
  padding: 2px 10px;
  font-size: 20px;
  font-weight: bold;
`;
const SubText = styled(Text)`
  padding: 2px 10px;
  font-size: 14px;
  font-color: gray;
`;
