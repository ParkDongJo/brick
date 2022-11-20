import {atom} from 'recoil';

export const toastStateAtom = atom<ToastState>({
  key: 'toast',
  default: {
    isShow: false,
    text: '',
  },
});

export interface ToastState {
  isShow: boolean;
  text: string;
}
