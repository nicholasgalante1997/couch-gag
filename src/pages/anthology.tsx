import React from 'react';
import { useNavigate } from 'react-router';
import { log } from '@nickgdev/couch-gag-common-lib';
import { Container, _heller_base } from '@nickgdev/hellerui';

import { pageStyles, forwardVarText, getSafeFontKey } from '../utils';
import { useThemeContext } from '../contexts';
import { useQueryAllMarkdownStories } from '../queries';

import { StoryRow } from '../components/StoryRow.widget';
import { Spinner } from '../components/Spinner';

export function AnthologyPage() {
  const navigate = useNavigate();
  const { font, palette } = useThemeContext();
  const { isLoading, isError, data, error } = useQueryAllMarkdownStories();

  React.useEffect(() => {
    const failureCase = isError || (data && !data.collection);
    if (failureCase) {
      log(
        'error',
        JSON.stringify(error ?? '[anthology] collection fetching error.')
      );
      navigate('/not-found');
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
      {Object.keys(data.collection).map((s: any, i: number) => (
        <Container width={'90%'}>
          <StoryRow
            index={i}
            imgSrc={data.collection[s].img}
            title={data.collection[s].title}
            subtitle={data.collection[s].subtitle}
            genres={data.collection[s].genres ?? []}
            episodeKey={data.collection[s].episodeKey}
            seasonKey={data.collection[s].seasonKey}
          />
        </Container>
      ))}
    </Container>
  ) : (
    <Container customStyles={pageStyles}>
      <Spinner />
    </Container>
  );
}
