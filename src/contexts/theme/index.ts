import { createContext, useContext } from 'react';
import {
  Theme as CouchGagTheme,
  heller_couch_view_theme_treatment_pool
} from '@nickgdev/couch-gag-common-lib';

export type Theme = CouchGagTheme & { darkMode: boolean };

const vts = heller_couch_view_theme_treatment_pool.ViewThemeTreatments;

export const _defaultTheme: Theme = {
  darkMode: false,
  font: vts[0].meta!.theme!.font,
  palette: vts[0].meta!.theme!.palette,
  treatmentId: vts[0].id
};

const ThemeContext = createContext<Theme>(_defaultTheme);
export const useThemeContext = () => useContext(ThemeContext);
export const ThemeProvider = ThemeContext.Provider;
export const LocalThemeContextConsumerConstructor = ThemeContext.Consumer;
