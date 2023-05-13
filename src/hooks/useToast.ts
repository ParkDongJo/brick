import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import useToastStore from '../store/useToastStore';

const FADEIN_DURATION = 700;
const FADEOUT_DURATION = 700;

const useToast = () => {
  const [toast, setToast] = useToastStore(state => [
    state.toast,
    state.setToast,
  ]);

  const opacityAni = useRef(new Animated.Value(0)).current;

  const show = (text: string) => {
    setToast({
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
    if (!toast.isShow) {
      return;
    }

    setTimeout(() => {
      Animated.timing(opacityAni, {
        toValue: 0.0,
        duration: FADEOUT_DURATION,
        useNativeDriver: true,
      }).start(() => {
        setToast({...toast, isShow: false});
      });
    }, delay);
  };

  useEffect(() => {
    const {isShow, text} = toast;
    if (isShow && text) {
      startFadeIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  return {
    isShow: toast.isShow,
    text: toast.text,
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
