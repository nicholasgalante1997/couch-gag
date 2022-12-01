import { createContext, useContext } from 'react';
import baseState from '../base-state.json';

const textContext = createContext<typeof baseState>(baseState);
const Provider = textContext.Provider;
export const TextContextProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[];
}) => <Provider value={baseState}>{children}</Provider>;

export const useHomePageText = () => {
  const state = useContext(textContext);
  return state.text.home;
};

export const useFooterText = () => {
  const state = useContext(textContext);
  return state.text.footer;
};

export const useNavbarData = () => {
  const state = useContext(textContext);
  return state.text.navbar;
};

export const useAnthText = () => {
  const state = useContext(textContext);
  return state.text.anthology;
};

export const useModalText = () => {
  const state = useContext(textContext);
  return state.text.modals;
};
