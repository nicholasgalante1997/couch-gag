import { Container } from '@nickgdev/hellerui';
import React from 'react';
import { useThemeContext } from '../../contexts';
import { getSafeFontKey } from '../../utils';
import { Font } from '../font';

type TableOfContentsProps = {
  isViewable: boolean;
  chapters: { s: string; k: string; a: boolean }[];
};

function sanitizeMarkdownHeading(s: string) {
  return s.replace(/#/g, '');
}

export function TableOfContents({
  isViewable,
  chapters
}: TableOfContentsProps) {
  const { palette, font } = useThemeContext();
  if (!isViewable) {
    return <div id="zeroed" />;
  }
  return (
      <Container
        className="table-of-contents-fixed"
        background={palette.backgroundColor}
        radius="rounded"
        padding="0.5rem"
        customStyles={{
          maxWidth: '200px',
          width: '200px'
        }}
      >
        <Font
          family={getSafeFontKey(font.google.family)}
          impl="h5"
          {...{
            customStyles: {
              color: palette.headingSecondaryColor
            }
          }}
        >
          Table Of Contents
        </Font>
        {chapters.map((ch, index) => (
          <Container>
            <a href="#">
              <Font
                family={getSafeFontKey(font.google.family)}
                impl="span"
                {...{
                  key: ch.k,
                  customStyles: {
                    fontSize: '12px'
                  }
                }}
              >
                {index + 1}. {sanitizeMarkdownHeading(ch.s)}
              </Font>
            </a>
          </Container>
        ))}
      </Container>
  );
}
