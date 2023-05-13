import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';

const ProfileImage: React.FC<Props> = props => {
  const {radius = 20, avatar} = props;

  const profile = {
    ['cat']: require('./../../static/cat_icon.png'),
    ['rabit']: require('./../../static/rabit_icon.png'),
    ['mongkey']: require('./../../static/mongkey_icon.png'),
    ['panda']: require('./../../static/panda_icon.png'),
    ['pig']: require('./../../static/pig_icon.png'),
    ['cow']: require('./../../static/cow_icon.png'),
  }[avatar];

  return (
    <Container
      width={radius * 2}
      height={radius * 2}
      radius={radius}
      source={profile}
    />
  );
};
export default ProfileImage;

type Props = Pick<StyleProps, 'radius'> & {
  avatar: string;
};
type StyleProps = {
  width: number;
  height: number;
  radius?: number;
};

const Container = styled(Image)<StyleProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: ${props => props.radius}px;
  background-color: #f0f0f0;
`;
