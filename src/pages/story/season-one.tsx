import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import {
  heller_couch_view_theme_treatment_pool as POOL,
  Theme,
  Treatment,
  log
} from '@nickgdev/couch-gag-common-lib';
import { Container, Page } from '@nickgdev/hellerui';

import { Spinner } from '../../components/animated/spinner';
import { StoryInteract } from '../../components/story-interact';
import { ThemeProvider } from '../../contexts';
import { useQuerySingleMarkdownStory } from '../../queries';
import {
  MARKDOWN_COMPONENT_MAPPING_FN,
  forwardVarText,
  getSafeFontKey,
  pageStyles,
  parseContent,
  serverThemeCacheInstance
} from '../../utils';
import { getStoryByStoryKey, getViewThemeTreatment } from '../../service';
import { Nav } from '../../components';

type StoryPageProps = {
  theme: Treatment<Theme>;
};

const defaultTheme = POOL.ViewThemeTreatments.filter(
  (vt) => vt.id.includes('major') && vt.id.includes('oswald')
)[0];

function StoryPage(props: StoryPageProps) {
  const { push: redirect, query } = useRouter();
  const {
    theme: { palette, font }
  } = props.theme.meta!;

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
    <ThemeProvider
      value={{ darkMode: false, font, palette, treatmentId: props.theme.id }}
    >
      <Nav />
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
    </ThemeProvider>
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
    queryKey: ['markdown', query?.seasonKey ?? '', query?.episodeKey ?? ''],
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

  let theme: Treatment<Theme>;

  if (!serverThemeCacheInstance.cache) {
    const { data, error } = await getViewThemeTreatment(
      undefined,
      undefined,
      undefined,
      ['major', 'oswald']
    );

    if (error) {
      theme = defaultTheme;
    } else {
      serverThemeCacheInstance.getCacheInstance(); // we know cache is undefined at this point
      serverThemeCacheInstance.setCacheInstance({
        k: 'theme',
        v: data.themeOptions[0]
      });
      theme = serverThemeCacheInstance.getCacheInstance().theme;
    }
  } else {
    theme = serverThemeCacheInstance.getCacheInstance().theme;
  }

  return { props: { dehydratedState: dehydrate(queryClient), theme } };
};

export default StoryPage;
