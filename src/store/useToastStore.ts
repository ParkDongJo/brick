import create from 'zustand'; // create로 zustand를 불러옵니다.

const useToastStore = create(set => ({
  toast: {text: '', isShow: false},
  setToast: (toast: ToastStore) => set({toast}),
}));

export type ToastStore = {
  text: string;
  isShow: boolean;
};

export default useToastStore;
