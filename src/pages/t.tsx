import React from 'react';
import { Button, Container } from '@nickgdev/hellerui';
import { heller_couch_view_theme_treatment_pool, Theme, Treatment } from '@nickgdev/couch-gag-common-lib';
import { useThemeContext } from '../contexts';
import { findNestedParagraphPaletteTheme, forwardVarText, getSafeFontKey } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

const nonsenseWords = [
  'view',
  'theme',
  'palette',
  'font',
  'treatment',
  'color',
  'dark',
  'light',
  '1',
  '2',
  'group'
];

function friendlyThemeName(s: string): string {
  return s.split('-').filter(w => !nonsenseWords.includes(w)).join(' ');
}

function ThemeSelectionPage() {
  const { setTheme, treatmentId, font, palette } = useThemeContext();
  const [localThemeIndex, setLocalThemeIndex] = React.useState(0);

  const orderedThemeList = React.useMemo(() => {
    const currentTheme = heller_couch_view_theme_treatment_pool.ViewThemeTreatments.filter(t => t.id === treatmentId);
    return [...currentTheme, ...heller_couch_view_theme_treatment_pool.ViewThemeTreatments.filter(t => t.id !== treatmentId)];
  }, [])

  const futureTheme = React.useMemo(() => {
    return orderedThemeList[localThemeIndex].meta!.theme;
  }, [localThemeIndex])

  function incrementLocalIndex(){
    setLocalThemeIndex(prevIndex => {
      if (prevIndex === orderedThemeList.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  }

  function decrementLocalIndex(){
    setLocalThemeIndex(prevIndex => {
      if (prevIndex === 0) {
        return orderedThemeList.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  }

  function getNestedBackground(s?: string | string[]): string | undefined {
    if (Array.isArray(s)) {
      return `linear-gradient(to bottom right, ${s[0]}, ${s[1]})`
    } else if (s) {
      return s;
    }
  }
  function handleOnChange() {
    const futureTreatmentId = futureTheme.treatmentId;
    const newTheme =
      heller_couch_view_theme_treatment_pool.ViewThemeTreatments.find(
        (t) => t.id === futureTreatmentId
      );
    setTheme({
      darkMode: false,
      font: newTheme!.meta!.theme.font,
      palette: newTheme!.meta!.theme.palette,
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
        overflow: 'hidden',
        flexWrap: 'nowrap'
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
      <Container customStyles={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}} width="100%">
        {forwardVarText(
          getSafeFontKey(font.google.family),
          `Current Theme: ${friendlyThemeName(treatmentId)}`,
          'h2',
          {
            customStyles: {
              color: palette.backgroundTertiaryColor
            }
          }
        )}
      </Container>
      <Container customStyles={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}} width="100%">
        <Container>
          <FontAwesomeIcon className="pointer" color={palette.headingPrimaryColor} icon={faCaretLeft} size={'3x'} onClick={decrementLocalIndex} />
        </Container>
        <Container>
          <Container customStyles={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', overflow: "hidden" }} width="500px">
            <Container margin='0px' padding="0px" width="100%" customStyles={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              {forwardVarText(
                getSafeFontKey(futureTheme.font.google.family),
                'New Theme: ' + friendlyThemeName(futureTheme.treatmentId),
                'h5',
                {
                  customStyles: {
                    color: futureTheme.palette.headingPrimaryColor
                  }
              }
              )}
              <Button onClick={handleOnChange} ghost backgroundColor={futureTheme.palette.backgroundTertiaryColor}>
                {
                  forwardVarText(
                    getSafeFontKey(futureTheme.font.google.family),
                    'Set as new theme',
                    'span'
                  )
                }
              </Button>
            </Container>
            {
              Object.values(futureTheme.palette.buttonColorOptions).map(colorKey => <Container margin="4px" width="100%" height={futureTheme.palette.buttonColorOptions.length > 6 ? "20px" : "40px"} radius='normal' background={colorKey} />)
            }
          </Container>
        </Container>
        <Container>
          <FontAwesomeIcon className="pointer" color={palette.headingPrimaryColor} icon={faCaretRight} size={'3x'} onClick={incrementLocalIndex} />
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
