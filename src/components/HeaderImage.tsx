import React, {FunctionComponent} from 'react';
import {Text, View, Image} from 'react-native';
import styled from 'styled-components';
import ViewDimension from './../lib/ViewDimention';

const HeaderImage: FunctionComponent<Props> = props => {
  const {title} = props;
  const mainImage = require('./../static/title_bg_image_apt.png');
  const imageHeight = ViewDimension.get().width * 0.833;

  return (
    <Container>
      <Main>
        <Dimmed height={imageHeight} />
        <Image
          style={{width: '100%', height: imageHeight}}
          source={mainImage}
          resizeMode="stretch"
        />
      </Main>
      <TitleText>{title}</TitleText>
    </Container>
  );
};
export default HeaderImage;

export type Props = {
  title: string;
};
export const HEADER_IMAGE_HEIGHT = 300;

const Container = styled(View)`
  position: relative;
  height: ${HEADER_IMAGE_HEIGHT}px;
  background-color: red;
`;
const Main = styled(View)`
  position: relative;
  top: 0;
  height: ${HEADER_IMAGE_HEIGHT}px;
  align-item: center;
  justify-content: flex-start;
  overflow: hidden;
  margin-bottom: 50px;
  background-color: blue;
`;
const Dimmed = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.height}px;
  z-index: 1;
  background-color: rgba(26, 26, 26, 0.15);
`;
const TitleText = styled(Text)`
  position: absolute;
  left: 24px;
  top: 150px;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #ffffff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
`;
