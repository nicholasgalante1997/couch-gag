import { useRouter } from 'next/router';
import { useThemeContext } from '../../contexts';
import { useNavbarData } from '../../store';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/hoverable';

export function Title() {
  const { push: redirect } = useRouter();
  const { font, palette } = useThemeContext();
  const { mainTitle } = useNavbarData();
  return (
    <Hoverable
      from={{ color: palette.headingPrimaryColor, fontSize: '1.15rem' }}
      to={{ color: palette.headingSecondaryColor, fontSize: '1.25rem' }}
    >
      {forwardVarText(getSafeFontKey(font.google.family), mainTitle, 'h3', {
        onClick: () => redirect('/')
      })}
    </Hoverable>
  );
}
