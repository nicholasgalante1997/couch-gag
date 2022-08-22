import { _heller_base } from '@nickgdev/hellerui';
import { useNavigate } from 'react-router';
import { useThemeContext } from '../../contexts';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/Hoverable';

export function Title() {
  const navigate = useNavigate();
  const { font, palette } = useThemeContext();

  return (
    <Hoverable
      from={{ color: palette.headingPrimaryColor, fontSize: '1.15rem' }}
      to={{ color: palette.headingSecondaryColor, fontSize: '1.25rem' }}
    >
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'couch gag v0',
        'h5',
        {
          onClick: () => navigate('/'),
        }
      )}
    </Hoverable>
  );
}
