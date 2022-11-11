import React from 'react';
import { useBpContext } from '../../contexts';
import { MobileSidebarNavModal } from '../modals/mobile/sidebar-nav';
import { LinkBar } from './LinkBar';
import { Title } from './MainTitle';
import { NavContainer } from './NavContainer';

export type NavProps = {
  modalOpen: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
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
      {!mobile && <LinkBar />}
      {props.modalOpen && (
        <MobileSidebarNavModal
          isOpen={props.modalOpen}
          setIsClosed={() => props.setModal(false)}
        />
      )}
    </NavContainer>
  );
}
