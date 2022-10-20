import {Dimensions} from 'react-native';

const STANDARD_LARGE_SCREEN_WIDTH = 600;
const FOLD_FRONT_SCREEN_WIDTH = 280; // 갤럭시 폴드를 접었을 시 스크림 width 값

const useDimention = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const isLargeScreen = (): boolean => {
    return Dimensions.get().width >= STANDARD_LARGE_SCREEN_WIDTH;
  };
  const isFoldFrontScreen = (): boolean => {
    return Dimensions.get().width <= FOLD_FRONT_SCREEN_WIDTH;
  };
  return {
    windowWidth,
    windowHeight,
    isLargeScreen,
    isFoldFrontScreen,
  };
};
export default useDimention;
