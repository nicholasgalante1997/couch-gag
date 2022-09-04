import React from 'react';
import { heller_couch_view_theme_treatment_pool } from '@nickgdev/couch-gag-common-lib';
import { OmniText, TextElementKeyType, VarFontProps } from '@nickgdev/hellerui';
import fontBlob from '@nickgdev/hellerui/lib/fontBlob.json';
import { Theme } from '../contexts';

const POOL = heller_couch_view_theme_treatment_pool.ViewThemeTreatments;

export type FontKey = keyof typeof fontBlob;

export const pageStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  minWidth: '100%'
} as const;

export function forwardVarText(
  family: FontKey,
  text: string,
  implementation: TextElementKeyType,
  props: VarFontProps = {}
) {
  let node: string | JSX.Element;
  if (props.children && text === '') node = props.children;
  else node = text;
  return (
    <OmniText {...props} fontKey={family} implementation={implementation}>
      {node}
    </OmniText>
  );
}

export function findThemeInDevEnvOrUndefined(
  slice: string,
  i?: number
): Theme | undefined {
  if (process.env.NODE_ENV === 'production') return undefined;
  const matchingThemes = POOL.filter((vt) => vt.id.includes(slice));
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
