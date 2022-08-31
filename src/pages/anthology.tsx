import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { log } from '@nickgdev/couch-gag-common-lib';
import { Container, _heller_base } from '@nickgdev/hellerui';

import { pageStyles, forwardVarText, getSafeFontKey } from '../utils';
import { useThemeContext } from '../contexts';
import { useQueryAllMarkdownStories } from '../queries';

import { AnthologyTile } from '../components/cards/anthology';
import { Spinner } from '../components/animated/Spinner';

export function AnthologyPage() {
  const { push: redirect } = useRouter();
  const { font, palette } = useThemeContext();
  const { isLoading, isError, data, error } = useQueryAllMarkdownStories();

  useEffect(() => {
    const failureCase = isError || (data && !data.collection);
    if (failureCase) {
      log(
        'error',
        JSON.stringify(error ?? '[anthology] collection fetching error.')
      );
      redirect('/not-found');
    }
  }, [isError, error]);

  return !isLoading && data && data.collection ? (
    <Container
      radius="none"
      width={'100%'}
      padding="0px"
      margin="0px"
      customStyles={{
        ...pageStyles,
        justifyContent: 'flex-start'
      }}
    >
      <Container width="90%">
        {forwardVarText(getSafeFontKey(font.google.family), 'Season One', 'p', {
          customStyles: {
            fontSize: 40,
            fontWeight: '200',
            color: palette.headingPrimaryColor
          }
        })}
      </Container>
      <Container width="90%" padding="0px">
        <Container
          asGridParent
          padding="0px"
          customStyles={{ flexWrap: 'wrap' }}
        >
          {Object.keys(data.collection).map((s: any, i: number) => (
            <AnthologyTile
              key={`${data.collection[s].episodeKey}-${i}`}
              title={data.collection[s].title}
              desc={data.collection[s].subtitle}
              cardKey={`${data.collection[s].seasonKey}-${data.collection[s].episodeKey}`}
              navigationFn={() => {
                redirect(
                  `/story/season-one?seasonKey=01&episodeKey=${data.collection[s].episodeKey}`
                );
              }}
            />
          ))}
        </Container>
      </Container>
    </Container>
  ) : (
    <Container customStyles={pageStyles}>
      <Spinner />
    </Container>
  );
}
