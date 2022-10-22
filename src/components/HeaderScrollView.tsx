import React, {useRef} from 'react';
import {
  Animated,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';

const HeaderScrollView: React.FunctionComponent<Props> = props => {
  const {headerMinHeight, header, headerHeight, onScroll} = props;
  const scrollYAnim = useRef(new Animated.Value(0)).current;

  const headerHeightAni = scrollYAnim.interpolate({
    inputRange: [0, headerHeight - headerMinHeight],
    outputRange: [headerHeight - headerMinHeight, headerMinHeight],
    extrapolate: 'clamp',
  });

  return (
    <>
      <RootScrollView
        bounces
        scrollEventThrottle={16}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          scrollYAnim.setValue(event.nativeEvent.contentOffset.y);
          onScroll(event.nativeEvent.contentOffset.y);
        }}>
        <Animated.View style={[styles.header, {height: headerHeightAni}]}>
          {header}
        </Animated.View>
        {props.children}
      </RootScrollView>
    </>
  );
};
export default HeaderScrollView;

type Props = {
  headerHeight: number;
  headerMinHeight: number;
  header: React.ReactElement;
  onScroll(offsetY: number): void;
};

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
    backgroundColor: 'red',
  },
});
const RootScrollView = styled(ScrollView)``;
