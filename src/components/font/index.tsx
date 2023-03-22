import React from 'react';
import fontBlob from '@nickgdev/hellerui/lib/fontBlob.json';
import { OmniText, TextElementKeyType } from '@nickgdev/hellerui';
import { Properties } from 'csstype';

export type FontKey = keyof typeof fontBlob;

export type FontProps = {
  family: FontKey;
  children: React.ReactNode;
  impl: TextElementKeyType;
  customStyles?: Properties;
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
