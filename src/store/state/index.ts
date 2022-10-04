import { atom, useRecoilState } from 'recoil';
import baseState from '../base-state.json';

export const textAtomState = atom({
  key: 'text',
  default: baseState.text
});

export const useHomePageText = () => {
  const [state] = useRecoilState(textAtomState);
  return state.home;
};

export const useFooterText = () => {
  const [state] = useRecoilState(textAtomState);
  return state.footer;
};

export const useNavbarData = () => {
  const [state] = useRecoilState(textAtomState);
  return state.navbar;
};
