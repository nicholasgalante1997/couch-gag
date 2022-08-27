import { Container, Button } from '@nickgdev/hellerui';
import { useThemeContext } from '../../../contexts';
import { forwardVarText, getSafeFontKey } from '../../../utils';
import { AnthologyTileProps } from './types';

import './index.css';

export const AnthologyTile = (props: AnthologyTileProps) => {
  const { font, palette } = useThemeContext();
  const { cardKey, desc, title, navigationFn } = props;
  return (
    <Container
      id={'card-parent-div-' + cardKey}
      asGridChild
      colSpan={4}
      margin="0px"
      padding="0px"
      height="40vh"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '40vh',
        maxHeight: '40vh'
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
            fontSize: '14px',

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
        <Button ghost onClick={navigationFn} style={{marginBottom: '20px', marginRight: '20px' }}>
          {forwardVarText(getSafeFontKey(font.google.family), 'Get Started', 'span')}
        </Button>
      </Container>
    </Container>
  );
};
