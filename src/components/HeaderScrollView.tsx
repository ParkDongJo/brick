import React, {useRef} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {HEADER_IMAGE_HEIGHT} from './../components/HeaderImage';

const HeaderScrollView: React.FunctionComponent<Props> = props => {
  const {headerMinHeight, header, onScroll} = props;
  const headerHeight = HEADER_IMAGE_HEIGHT;
  const scrollYAnim = useRef(new Animated.Value(0)).current;

  const headerHeightAni = scrollYAnim.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: 'clamp',
  });
  const fakeViewPaddingTopAni = scrollYAnim.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View style={[styles.header, {height: headerHeightAni}]}>
        {header}
      </Animated.View>
      <RootScrollView
        bounces
        style={{marginTop: 0}}
        scrollEventThrottle={16}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          scrollYAnim.setValue(event.nativeEvent.contentOffset.y);
          onScroll(event.nativeEvent.contentOffset.y);
        }}>
        <Animated.View style={[{paddingTop: fakeViewPaddingTopAni}]} />
        {props.children}
      </RootScrollView>
    </>
  );
};
export default HeaderScrollView;

type Props = {
  headerMinHeight: number;
  header: React.ReactElement;
  onScroll(offsetY: number): void;
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
});
const RootScrollView = styled(ScrollView)`
  margin-top: ${props => props.style?.marginTop};
`;
