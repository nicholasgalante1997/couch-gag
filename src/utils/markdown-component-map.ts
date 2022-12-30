/* eslint-disable @typescript-eslint/no-unused-vars */

import { Font, Palette } from '@nickgdev/couch-gag-common-lib';
import { forwardVarText } from './theme';
import { getSafeFontKey } from './font';

export default (font: Font, palette: Palette) => ({
  h1: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'h4', {
      ...props,
      customStyles: {
        color: palette.headingPrimaryColor
      }
    }),
  h2: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'h4', {
      ...props,
      customStyles: {
        color: palette.headingPrimaryColor
      }
    }),
  h3: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'h4', {
      ...props,
      customStyles: {
        color: palette.headingPrimaryColor
      }
    }),
  h4: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'h4', {
      ...props,
      customStyles: {
        color: palette.headingPrimaryColor,
        fontSize: 30
      }
    }),
  h5: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'h4', {
      ...props,
      customStyles: {
        color: palette.headingPrimaryColor,
        fontSize: 30
      }
    }),
  h6: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'h4', {
      ...props,
      customStyles: {
        color: palette.headingPrimaryColor,
        fontSize: 30
      }
    }),
  p: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'p', {
      ...props,
      customStyles: {
        fontSize: 16,
        color: palette.paragraphTextColor
      }
    }),
  b: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'span', {
      ...props,
      customStyles: {
        fontSize: 14,
        color: palette.paragraphTextColor,
        fontWeight: 'bold'
      }
    }),
  i: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'span', {
      ...props,
      customStyles: {
        fontSize: 14,
        color: palette.paragraphTextColor,
        fontStyle: 'italic'
      }
    }),
  span: ({ node, ...props }: any) =>
    forwardVarText(getSafeFontKey(font.google.family), props.children, 'span', {
      ...props,
      customStyles: {
        fontSize: 14,
        color: palette.paragraphTextColor
      }
    })
});

/** eslint-enable */
