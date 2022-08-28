
import { Container, Button } from '@nickgdev/hellerui';

import { useThemeContext } from '../../../contexts';
import { CouchGagBreakpoints, useInlineMediaQuery } from '../../../hooks';
import { forwardVarText, getSafeFontKey } from '../../../utils';

import { AnthologyTileProps } from './types';

import './index.css';

export const AnthologyTile = (props: AnthologyTileProps) => {
  const { font, palette } = useThemeContext();
  const media = useInlineMediaQuery();

  const { cardKey, desc, title, navigationFn } = props;
  return (
    <Container
      id={'card-parent-div-' + cardKey}
      asGridChild
      colSpan={media.breakpoint === CouchGagBreakpoints.DESKTOP ? 4 : 12}
      margin="0px"
      padding="0px"
      height="33vh"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '33vh',
        maxHeight: '33vh'
      }}
    >
      <Container padding="0px" width="100%">
        {forwardVarText(getSafeFontKey(font.google.family), title, 'h3', {
          customStyles: {
            color: palette.headingSecondaryColor,
            maxWidth: '50%'
          }
        })}
        {forwardVarText(getSafeFontKey(font.google.family), desc, 'p', {
          className: 'trunc',
          customStyles: {
            color: palette.paragraphTextColor,
            marginTop: '8px',
            maxWidth: '70%',
            width: '70%',
            minWidth: '70%',
            fontSize: '14px'
          }
        })}
      </Container>
      <Container
        padding="0px"
        width="100%"
        customStyles={{
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}
      >
        <Button
          backgroundColor={palette.backgroundTertiaryColor}
          onClick={navigationFn}
          style={{ marginBottom: '20px', marginRight: '20px' }}
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'Get Started',
            'span',
            {
              customStyles: {
                color: palette.paragraphTextColor
              }
            }
          )}
        </Button>
      </Container>
    </Container>
  );
};
