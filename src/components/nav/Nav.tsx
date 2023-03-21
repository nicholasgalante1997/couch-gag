import React from 'react';
import { useBpContext } from '../../contexts';
import { MobileSidebarNavModal } from '../modals/mobile/sidebar-nav';
import { LinkBar } from './LinkBar';
import { Title } from './MainTitle';
import { NavContainer } from './NavContainer';
import { ToggleSwitch } from '../animated/toggle/index';

export type NavProps = {
  modalOpen: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  themeMode: 'light' | 'dark';
  toggleTheme: (mode: 'light' | 'dark') => void;
};

export function Nav(props: NavProps) {
  const { breakpointKeyName } = useBpContext();
  const mobile = React.useMemo(
    () => breakpointKeyName === 'mobile',
    [breakpointKeyName]
  );
  return (
    <NavContainer>
      <Title
        mobile={mobile}
        mobileToggleVisibleStateFn={() => props.setModal(true)}
      />
      {mobile && <ToggleSwitch onSelect={props.toggleTheme} themeMode={props.themeMode} />}
      {!mobile && <LinkBar onSelect={props.toggleTheme} themeMode={props.themeMode} />}
      {props.modalOpen && (
        <MobileSidebarNavModal
          isOpen={props.modalOpen}
          setIsClosed={() => props.setModal(false)}
        />
      )}
    </NavContainer>
  );
}
