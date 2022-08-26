import { heller_couch_view_theme_treatment_pool } from '@nickgdev/couch-gag-common-lib';
import { Theme } from '../contexts';

const POOL = heller_couch_view_theme_treatment_pool.ViewThemeTreatments;

export function getThemedTextColor(darkMode: boolean) {
  return darkMode ? 'rgba(270,270,270,0.85)' : 'darkblue';
}

export function findThemeInDevEnvOrUndefined(
  slice: string,
  i?: number
): Theme | undefined {
  if (process.env.NODE_ENV === 'production') return undefined;
  let matchingThemes = POOL.filter((vt) => vt.id.includes(slice));
  if (matchingThemes.length === 0) return undefined;
  if (typeof i === 'undefined' || i > matchingThemes.length - 1) {
    return {
      darkMode: false,
      font: matchingThemes[0].meta!.theme!.font,
      palette: matchingThemes[0].meta!.theme!.palette,
      treatmentId: matchingThemes[0].id
    };
  }
  return {
    darkMode: false,
    font: matchingThemes[i].meta!.theme!.font,
    palette: matchingThemes[i].meta!.theme!.palette,
    treatmentId: matchingThemes[i].id
  };
}
