import {useEffect, useRef} from 'react';
import {useRecoilState} from 'recoil';
import {toastStateAtom} from './../store/atoms/global';
import {Animated} from 'react-native';

const FADEIN_DURATION = 700;
const FADEOUT_DURATION = 700;

const useToast = () => {
  const [toastState, setToastState] = useRecoilState(toastStateAtom);
  const opacityAni = useRef(new Animated.Value(0)).current;

  const show = (text: string) => {
    setToastState({
      isShow: true,
      text,
    });
  };

  const startFadeIn = () => {
    Animated.timing(opacityAni, {
      toValue: 0.8,
      duration: FADEIN_DURATION,
      useNativeDriver: true,
    }).start(() => {
      startFadeOut();
    });
  };

  const startFadeOut = (delay = DURATION.LENGTH_SHORT) => {
    if (!toastState.isShow) {
      return;
    }

    setTimeout(() => {
      Animated.timing(opacityAni, {
        toValue: 0.0,
        duration: FADEOUT_DURATION,
        useNativeDriver: true,
      }).start(() => {
        setToastState({...toastState, isShow: false});
      });
    }, delay);
  };

  useEffect(() => {
    const {isShow, text} = toastState;
    if (isShow && text) {
      startFadeIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastState]);

  return {
    isShow: toastState.isShow,
    text: toastState.text,
    opacityAni,
    show,
    startFadeIn,
  };
};
export default useToast;

export const DURATION = {
  LENGTH_SHORT: 500,
  FOREVER: 0,
};
