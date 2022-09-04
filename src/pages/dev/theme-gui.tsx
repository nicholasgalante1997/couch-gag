import { Button, Container } from '@nickgdev/hellerui';
import { heller_couch_view_theme_treatment_pool } from '@nickgdev/couch-gag-common-lib';
import React, { useState } from 'react';
import { Theme } from '../../contexts';
import { forwardVarText, getSafeFontKey } from '../../utils';

const themeOpts = heller_couch_view_theme_treatment_pool.ViewThemeTreatments;

const ip =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
export function ThemeGui() {
  const [localTheme, setLocalTheme] = useState<Theme>({
    darkMode: false,
    font: themeOpts[0].meta!.theme!.font,
    palette: themeOpts[0].meta!.theme!.palette,
    treatmentId: themeOpts[0].id
  });

  function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;
    const theme = themeOpts.filter((t) => t.id === id)[0];
    if (typeof theme === 'undefined') return;
    setLocalTheme({
      darkMode: false,
      treatmentId: theme.id,
      font: theme.meta!.theme!.font,
      palette: theme.meta!.theme!.palette
    });
  }

  function renderThemeLayout() {
    return (
      <>
        {forwardVarText(
          getSafeFontKey(localTheme?.font.google.family),
          localTheme?.font.google.family,
          'h2',
          {
            customStyles: {
              color: localTheme.palette.headingPrimaryColor,
              textAlign: 'center'
            }
          }
        )}
        <hr
          style={{ width: '80%' }}
          color={localTheme.palette.headingSecondaryColor}
        />
        {forwardVarText(
          getSafeFontKey(localTheme?.font.google.family),
          ip,
          'p',
          {
            customStyles: {
              color: localTheme.palette.paragraphTextColor
            }
          }
        )}
        <br />
        <Container
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          {forwardVarText(
            getSafeFontKey(localTheme.font.google.family),
            'button options',
            'span',
            { customStyles: { color: 'white' } }
          )}
          {localTheme.palette.buttonColorOptions.map((bOpt) =>
            bOpt.length === 7 ? (
              <Button color="#000000" backgroundColor={bOpt}>
                {bOpt}
              </Button>
            ) : (
              <></>
            )
          )}
        </Container>
      </>
    );
  }

  return (
    <Container asGridParent height="100%">
      <Container
        background={localTheme?.palette.backgroundColor}
        asGridChild
        colSpan={6}
        padding="12px"
      >
        {renderThemeLayout()}
      </Container>
      <Container
        asGridChild
        colSpan={6}
        background="#fff"
        customStyles={{
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <label style={{ fontFamily: 'Poppins' }} htmlFor="theme-select">
          out of the box themes
        </label>
        <select
          style={{ fontFamily: 'Poppins' }}
          value={localTheme.treatmentId}
          onChange={handleThemeChange}
          name="theme-select"
          id="theme-select"
        >
          {themeOpts.map((theme) => {
            return (
              <option
                key={theme.id}
                style={{ fontFamily: 'Poppins' }}
                value={theme.id}
              >
                {theme.id}
              </option>
            );
          })}
        </select>
      </Container>
    </Container>
  );
}
