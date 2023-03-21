import { Container } from '@nickgdev/hellerui';
import { useRouter } from 'next/router';
import React from 'react';
import ReactModal from 'react-modal';
import { useThemeContext } from '../../../../contexts';
import { useModalText, useNavbarData } from '../../../../store';
import { getSafeFontKey } from '../../../../utils';
import { Font } from '../../../font';

type MobileSidebarNavModalProps = {
  isOpen: boolean;
  setIsClosed: () => void;
};

const NEXT_ROOT = '#__next';

export function MobileSidebarNavModal(props: MobileSidebarNavModalProps) {
  const { isOpen } = props;
  const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
  const { palette, font } = useThemeContext();
  const {
    mobile: { sidebar }
  } = useModalText();
  const { links } = useNavbarData();
  const { push: redirect } = useRouter();

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
        <Font
          family={getSafeFontKey(font.google.family)}
          impl="h1"
          {...{
            customStyles: {
              color: palette.backgroundComplimentColor
            }
          }}
        >
          {sidebar.title}
        </Font>
        <hr className="mobile-modal-sidebar-x-rule" />
        <Container className="mobile-modal-link-container" padding="6px">
          {links.map((linkData) => {
            return (
              <Container
                key={linkData.meta.pageClickTag}
                width="100%"
                height="70px"
                onClick={() => redirect(linkData.localHref)}
              >
                <Font family={getSafeFontKey(font.google.family)} impl="b">
                  {linkData.plainText}
                </Font>
              </Container>
            );
          })}
        </Container>
      </ReactModal>
    );
  } else {
    return null;
  }
}
