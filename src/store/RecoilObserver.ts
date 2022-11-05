import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';

const RecoilObserver = ({node, mockFn}) => {
  const value = useRecoilValue(node);
  useEffect(() => mockFn(value), [mockFn, value]);
  return null;
};
export default RecoilObserver;
