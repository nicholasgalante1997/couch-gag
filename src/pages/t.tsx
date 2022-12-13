import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { heller_couch_view_theme_treatment_pool } from '@nickgdev/couch-gag-common-lib';
import { useThemeContext } from '../contexts';
import { findNestedParagraphPaletteTheme, forwardVarText, getSafeFontKey } from '../utils';

const nonsenseWords = [
  'view',
  'theme',
  'palette',
  'font',
  'treatment',
  'color',
  'dark',
  'light'
];

function ThemeSelectionPage() {
  const { setTheme, treatmentId, font, palette } = useThemeContext();
  const [localThemeIndex, setLocalThemeIndex] = React.useState(0);
  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const futureTreatmentId = e.target.value;
    const futureTheme =
      heller_couch_view_theme_treatment_pool.ViewThemeTreatments.find(
        (t) => t.id === futureTreatmentId
      );
    setTheme({
      darkMode: false,
      font: futureTheme!.meta!.theme.font,
      palette: futureTheme!.meta!.theme.palette,
      treatmentId: futureTreatmentId
    });
  }
  return (
    <Container
      padding="10px"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        justifySelf: 'center',
        width: '90%',
        height: '88.2vh',
        overflow: 'hidden'
      }}
    >
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'Customize your theme',
        'h1',
        {
          customStyles: {
            color: palette.backgroundTertiaryColor
          }
        }
      )}
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'Select from some pre-constructed themes below',
        'p',
        {
          customStyles: {
            color: findNestedParagraphPaletteTheme(palette.paragraphTextColor)
          }
        }
      )}
      <Container customStyles={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}} width="100%" padding="1rem">
        Current Theme: {treatmentId}
      </Container>
      <Container customStyles={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}} width="100%" padding="1rem">
        <Container>
          left arrow
        </Container>
        <Container>
          content
        </Container>
        <Container>
          right arrow
        </Container>
      </Container>
      {/* <select
        onChange={handleOnChange}
        className="t-select"
        value={treatmentId}
      >
        {heller_couch_view_theme_treatment_pool.ViewThemeTreatments.map(
          (t) => t.id
        ).map((tId) => (
          <option className="t-option" key={tId} value={tId}>
            {forwardVarText(
              getSafeFontKey(font.google.family),
              tId
                .split('-')
                .filter((word) => !nonsenseWords.includes(word))
                .map(
                  (word) =>
                    word.substring(0, 1).toUpperCase() + word.substring(1)
                )
                .join(' '),
              'span',
              {
                customStyles: {
                  color: palette.paragraphTextColor
                }
              }
            )}
          </option>
        ))}
      </select> */}
    </Container>
  );
}

export default ThemeSelectionPage;
