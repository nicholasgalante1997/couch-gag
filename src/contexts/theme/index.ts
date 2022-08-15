import { createContext, useContext } from 'react';
import {
  Theme as CouchGagTheme,
  heller_couch_view_theme_treatment_pool
} from '@nickgdev/couch-gag-common-lib';

export type Theme = CouchGagTheme & { darkMode: boolean };

const vts = heller_couch_view_theme_treatment_pool.ViewThemeTreatments;

const defaultLightThemeLocal = vts.filter(
  (vt) => vt.control && vt.id.includes('light')
)[0];
const defaultDarkThemeLocal = vts.filter(
  (vt) => vt.control && vt.id.includes('dark')
)[0];

export const DEFAULT_LIGHT_THEME: Theme = {
  darkMode: false,
  treatmentId: defaultLightThemeLocal.id,
  font: defaultLightThemeLocal.meta!.theme!.font,
  palette: defaultLightThemeLocal.meta!.theme!.palette
} as const;

export const DEFAULT_DARK_THEME: Theme = {
  darkMode: true,
  treatmentId: defaultDarkThemeLocal.id,
  font: defaultDarkThemeLocal.meta!.theme!.font,
  palette: defaultDarkThemeLocal.meta!.theme!.palette
} as const;

export const _defaultTheme: Theme = {
  darkMode: true,
  font: {
    fallback: 'sans-serif',
    google: { family: 'Poppins' }
  },
  palette: {
    backgroundColor: '#000020',
    headingPrimaryColor: 'deeppink',
    paragraphTextColor: 'white',
    headingSecondaryColor: 'white',
    buttonColorOptions: []
  },
  treatmentId: 'control-default-theme-client'
};

const ThemeContext = createContext<Theme>(_defaultTheme);
export const useThemeContext = () => useContext(ThemeContext);
export const ThemeProvider = ThemeContext.Provider;
export const LocalThemeContextConsumerConstructor = ThemeContext.Consumer;
