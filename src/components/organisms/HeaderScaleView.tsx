import React, {useRef} from 'react';
import {
  Animated,
  Image,
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';

const HeaderScaleView: React.FunctionComponent<Props> = props => {
  const {headerMinHeight, header, headerHeight, onScroll} = props;
  const scrollYAnim = useRef(new Animated.Value(0)).current;

  const scaleAni = scrollYAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <RootScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          scrollYAnim.setValue(event.nativeEvent.contentOffset.y);
          onScroll(event.nativeEvent.contentOffset.y);
        }}>
        <Header>
          <Animated.View
            style={[styles.header, {transform: [{scale: scaleAni}]}]}>
            <ProfileImg
              source={require('./../../static/title_bg_image_apt.png')}
            />
            <TitleText>{'Charles'}</TitleText>
          </Animated.View>
        </Header>
        {props.children}
      </RootScrollView>
    </>
  );
};
export default HeaderScaleView;

type Props = {
  headerHeight: number;
  headerMinHeight: number;
  header: React.ReactElement;
  onScroll(offsetY: number): void;
};

const styles = StyleSheet.create({
  header: {
    width: 150,
    height: 150,
  },
});

const Header = styled(View)`
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;
const ProfileImg = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;
const TitleText = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #ffffff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
`;
const RootScrollView = styled(ScrollView)``;
