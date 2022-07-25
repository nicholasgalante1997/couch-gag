import React from 'react';
import { OmniText, TextElementKeyType, VarFontProps } from '@nickgdev/hellerui';
import fontBlob from '@nickgdev/hellerui/lib/fontBlob.json';

type FontKey = keyof typeof fontBlob;

export const pageStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '70vh'
} as const;

export function forwardVarText(
  family: FontKey,
  text: string,
  implementation: TextElementKeyType,
  props: VarFontProps = {}
) {
  return (
    <OmniText {...props} fontKey={family} implementation={implementation}>
      {text}
    </OmniText>
  );
}
