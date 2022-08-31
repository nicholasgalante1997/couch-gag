import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { log } from '@nickgdev/couch-gag-common-lib';

import { Container, Page, _heller_base } from '@nickgdev/hellerui';

import {
  pageStyles,
  recursiveQueryParamConversion,
  parseUrlString,
  parseContent,
  getSafeFontKey,
  forwardVarText,
  MARKDOWN_COMPONENT_MAPPING_FN
} from '../utils';
import { useQuerySingleMarkdownStory } from '../queries';
import { useThemeContext } from '../contexts';
import { Spinner } from '../components/animated/Spinner';
import { StoryInteract } from '../components/story-interact';

export function StoryPage() {

  const { push: redirect, query } = useRouter();
  const { palette, font } = useThemeContext();

  // const queryParam = recursiveQueryParamConversion({}, parseUrlString(query));

  const { data, error, isLoading, isError } = useQuerySingleMarkdownStory({
    seasonKey: typeof query?.seasonKey === 'string' ? query?.seasonKey : query?.seasonKey ? query.seasonKey[0] : '',
    episodeKey: typeof query?.episodeKey === 'string' ? query?.episodeKey : query?.episodeKey ? query.episodeKey[0] : ''
  });

  const parsedContent = useMemo(() => parseContent(data?.content), [data]);

  function renderPageHeading(t: string, s: string) {
    return (
      <Container
        width="90%"
        customStyles={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        {forwardVarText(getSafeFontKey(font.google.family), t, 'h1', {
          customStyles: {
            color: palette.headingSecondaryColor,
            lineHeight: 1.15,
            fontSize: '4rem'
          }
        })}
        {forwardVarText(getSafeFontKey(font.google.family), s, 'h5', {
          customStyles: {
            color: palette.backgroundTertiaryColor,
            lineHeight: 1.15,
            fontSize: '1.15rem',
            marginTop: '0.75rem',
            textAlign: 'center'
          }
        })}
      </Container>
    );
  }

  React.useEffect(() => {
    if (isError) {
      log('error', JSON.stringify(error));
      redirect('/not-found');
    }
  }, [query, data]);

  if (isLoading) {
    return <Spinner />;
  }

  return data && data.meta && parsedContent && parsedContent.body ? (
    <Container width="100%" customStyles={pageStyles}>
      <StoryInteract />
      <Container
        radius="none"
        width={'90%'}
        padding="0px"
        margin="0px"
        customStyles={pageStyles}
      >
        {renderPageHeading(data.meta.title, data.meta.subtitle ?? '')}
        <Page
          contentEngine="markdown"
          content={parsedContent.body}
          title=""
          dangerouslyOverrideInnerContentStyles={{
            styles: {
              maxWidth: '80%',
              width: 'auto',
              justifySelf: 'center',
              alignSelf: 'center'
            }
          }}
          customComponentMap={MARKDOWN_COMPONENT_MAPPING_FN(font, palette)}
        />
        )
      </Container>
    </Container>
  ) : (
    <Container
      radius="none"
      width="100%'"
      padding="0px"
      margin="0px"
      customStyles={pageStyles}
    >
      <Spinner />
    </Container>
  );
}
