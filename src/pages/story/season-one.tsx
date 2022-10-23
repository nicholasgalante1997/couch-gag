import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import { log } from '@nickgdev/couch-gag-common-lib';
import { Container, Page } from '@nickgdev/hellerui';

import { Spinner } from '../../components/animated/spinner';
import { StoryInteract } from '../../components/story-interact';
import { useThemeContext } from '../../contexts';
import { useQuerySingleMarkdownStory } from '../../queries';
import {
  MARKDOWN_COMPONENT_MAPPING_FN,
  forwardVarText,
  getSafeFontKey,
  pageStyles,
  parseContent,
  reduceAndBool
} from '../../utils';
import { getStoryByStoryKey } from '../../service';

export const selectors = {
  storyHeading: {
    container: {
      id: 'story-page-heading'
    }
  }
} as const;

function isStoryHeadingInView(): boolean {
  if (typeof window === 'undefined') return false;
  const element = document.querySelector(
    `#${selectors.storyHeading.container.id}`
  );
  console.log(element);
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const isViewable =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  console.log(isViewable);
  return isViewable;
}

function StoryPage() {
  const { push: redirect, query } = useRouter();
  const { palette, font } = useThemeContext();
  const [headingOutOfView, setHeadingOutOfView] = React.useState<boolean>(
    isStoryHeadingInView()
  );
  console.log(headingOutOfView, setHeadingOutOfView);
  const { data, error, isLoading, isError } = useQuerySingleMarkdownStory({
    seasonKey:
      typeof query?.seasonKey === 'string'
        ? query?.seasonKey
        : query?.seasonKey
        ? query.seasonKey[0]
        : '',
    episodeKey:
      typeof query?.episodeKey === 'string'
        ? query?.episodeKey
        : query?.episodeKey
        ? query.episodeKey[0]
        : ''
  });

  const parsedContent = useMemo(() => parseContent(data?.content), [data]);
  const ready = useMemo(
    () => reduceAndBool(data, data?.meta, parsedContent, parsedContent?.body),
    [data, parsedContent]
  );

  function renderPageHeading(t: string, s: string) {
    return (
      <Container
        width="90%"
        id={selectors.storyHeading.container.id}
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
    function handleTitleExit() {
      console.log('scroll');
    }

    document.addEventListener('scroll', handleTitleExit);
  }, []);

  React.useEffect(() => {
    if (isError) {
      log('error', JSON.stringify(error));
      redirect('/not-found');
    }
  }, [query, data]);

  if (isLoading) {
    return <Spinner />;
  }

  return ready ? (
    <Container width="100%" customStyles={{ ...pageStyles }}>
      <StoryInteract />
      <Container
        radius="none"
        width={'90%'}
        padding="0px"
        margin="0px"
        customStyles={{ ...pageStyles }}
      >
        {renderPageHeading(data!.meta.title, data!.meta.subtitle ?? '')}
        <Page
          contentEngine="markdown"
          content={parsedContent!.body}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  if (!query?.seasonKey && !query?.episodeKey) return { notFound: true };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['markdown', query.seasonKey ?? '', query.episodeKey ?? ''],
    queryFn: () =>
      getStoryByStoryKey({
        seasonKey: Array.isArray(query.seasonKey)
          ? query.seasonKey[0]
          : query.seasonKey
          ? query.seasonKey
          : '01',
        episodeKey: Array.isArray(query.episodeKey)
          ? query.episodeKey[0]
          : query.episodeKey
          ? query.episodeKey
          : '01'
      })
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default StoryPage;
