import { Container } from '@nickgdev/hellerui';
import React from 'react';
import ReactModal from 'react-modal';
import { useThemeContext } from '../../../../contexts';
import { forwardVarText, getSafeFontKey } from '../../../../utils';

type MobileSidebarNavModalProps = {
  isOpen: boolean;
  setIsClosed: () => void;
};

const NEXT_ROOT = '#__next';

export function MobileSidebarNavModal(props: MobileSidebarNavModalProps) {
  const { isOpen } = props;
  const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
  const { palette } = useThemeContext();

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser && typeof document !== 'undefined') {
    return (
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        parentSelector={() => document.querySelector(NEXT_ROOT)!}
        appElement={document.querySelector(NEXT_ROOT)! as HTMLElement}
        overlayClassName="mobile-sidebar-overlay"
        className="mobile-sidebar-content"
        onRequestClose={() => props.setIsClosed()}
      >
        {forwardVarText(getSafeFontKey('Caveat'), 'couch gag', 'h1', {
          customStyles: {
            color: palette.backgroundColor
          }
        })}
        <hr color="black" style={{ width: '90%' }} />
        <Container>{}</Container>
      </ReactModal>
    );
  } else {
    return null;
  }
}
