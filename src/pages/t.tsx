import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { heller_couch_view_theme_treatment_pool } from '@nickgdev/couch-gag-common-lib';
import { useThemeContext } from '../contexts';
import { forwardVarText, getSafeFontKey } from '../utils';

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
  const { setTheme, treatmentId, font } = useThemeContext();
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
        'h1'
      )}
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'Select from some pre-constructed themes below',
        'p'
      )}
      <select
        onChange={handleOnChange}
        className="t-select"
        value={treatmentId}
      >
        {heller_couch_view_theme_treatment_pool.ViewThemeTreatments.map(
          (t) => t.id
        ).map((tId) => (
          <option className="t-option" key={tId} value={tId}>
            {tId
              .split('-')
              .filter((word) => !nonsenseWords.includes(word))
              .map(
                (word) => word.substring(0, 1).toUpperCase() + word.substring(1)
              )
              .join(' ')}
          </option>
        ))}
      </select>
    </Container>
  );
}

export default ThemeSelectionPage;
