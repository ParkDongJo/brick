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
  const MAX_HEIGHT = Number.MAX_SAFE_INTEGER - headerHeight;

  const headerHeightAni = scrollYAnim.interpolate({
    inputRange: [-MAX_HEIGHT, headerHeight - headerMinHeight],
    outputRange: [MAX_HEIGHT + headerHeight, headerMinHeight],
    extrapolate: 'clamp',
  });
  const fakeViewPaddingTopAni = scrollYAnim.interpolate({
    inputRange: [0, headerHeight - headerMinHeight],
    outputRange: [
      headerHeight - headerMinHeight,
      headerHeight + 28 - headerMinHeight,
    ],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View style={[styles.header, {height: headerHeightAni}]}>
        {header}
      </Animated.View>
      <RootScrollView
        bounces
        style={{marginTop: headerMinHeight}}
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
  },
});
const RootScrollView = styled(ScrollView)`
  margin-top: ${props => props.style?.marginTop};
`;
