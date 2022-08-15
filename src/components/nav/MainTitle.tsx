import { _heller_base } from '@nickgdev/hellerui';
import { useNavigate } from 'react-router';
import { useThemeContext } from '../../contexts';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { Hoverable } from '../Hoverable';

export function Title() {
  const navigate = useNavigate();
  const { font, palette } = useThemeContext();

  console.log(font);
  return (
    <Hoverable
      from={{ fontSize: '1.15rem' }}
      to={{ color: _heller_base.colors.dunbar.lightCyan, fontSize: '1.25rem' }}
    >
      {forwardVarText(getSafeFontKey(font.google.family), 'couch gag v0', 'h5', {
        onClick: () => navigate('/')
      })}
    </Hoverable>
  );
}
