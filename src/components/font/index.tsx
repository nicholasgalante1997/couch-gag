import React from 'react';
import fontBlob from '@nickgdev/hellerui/lib/fontBlob.json';
import { OmniText, TextElementKeyType } from '@nickgdev/hellerui';

export type FontKey = keyof typeof fontBlob;

type FontProps = {
  family: FontKey;
  children: React.ReactNode;
  impl: TextElementKeyType;
} & React.HTMLAttributes<
  HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
>;

export function Font(props: FontProps) {
  return (
    <OmniText {...props} fontKey={props.family} implementation={props.impl}>
      {props.children}
    </OmniText>
  );
}
