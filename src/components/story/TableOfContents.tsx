import { Container } from '@nickgdev/hellerui';
import React from 'react';
import { useThemeContext } from '../../contexts';
import { getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated';
import { Font } from '../font';

type TableOfContentsProps = {
  isViewable: boolean;
  chapters: { s: string; k: string; a: boolean }[];
};

export function TableOfContents({
  isViewable,
  chapters
}: TableOfContentsProps) {
  const { palette, font } = useThemeContext();
  if (!isViewable) {
    return <div id="zeroed" />;
  }
  return (
    <Hoverable
      className="poptop"
      from={{ boxShadow: 'none' }}
      to={{ boxShadow: '1px 2px 2px white' }}
    >
      <Container
        background={palette.backgroundColor}
        radius="rounded"
        padding="0.5rem"
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
        {chapters.map((ch) => (
          <Container>
            <a href="#">
              <Font
                family={getSafeFontKey(font.google.family)}
                impl="span"
                {...{
                  key: ch.k
                }}
              >
                {ch.s}
              </Font>
            </a>
          </Container>
        ))}
      </Container>
    </Hoverable>
  );
}
