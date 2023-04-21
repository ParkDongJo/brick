import React from 'react';
import {Text, View, Image} from 'react-native';
import styled from 'styled-components';

const ProfileImage: React.FC<Props> = props => {
  const {title} = props;
  const mainImage = require('./../../static/title_bg_image_apt.png');

  return (
    <Container>
      {/* <ProfileImg source={mainImage} /> */}
      <Box />
      {/* <TitleText>{title}</TitleText> */}
    </Container>
  );
};
export default ProfileImage;

export type Props = {
  title: string;
};

const Container = styled(View)`
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  background-color: blue;
`;
// const Main = styled(View)`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   background-color: blue;
// `;
const ProfileImg = styled(Image)`
  width: 50px;
  height: 50px;
`;
const Box = styled(View)`
  width: 20px;
  height: 20px;
  background-color: black;
`;

const TitleText = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #ffffff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
`;
