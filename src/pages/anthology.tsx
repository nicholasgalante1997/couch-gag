import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';
import {
  heller_couch_view_theme_treatment_pool as POOL,
  Theme,
  Treatment,
  log
} from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';

import {
  forwardVarText,
  getSafeFontKey,
  pageStyles,
  serverThemeCacheInstance
} from '../utils';
import { ThemeProvider } from '../contexts';
import { getStories, getViewThemeTreatment } from '../service';
import { useQueryAllMarkdownStories } from '../queries';

import { AnthologyTile } from '../components/cards/anthology';
import { Spinner } from '../components/animated/spinner';
import { Nav } from '../components';

const defaultTheme = POOL.ViewThemeTreatments.filter(
  (vt) => vt.id.includes('major') && vt.id.includes('oswald')
)[0];

type AnthologyPageProps = {
  theme: Treatment<Theme>;
};

function AnthologyPage(props: AnthologyPageProps) {
  const { push: redirect } = useRouter();
  const {
    theme: { font, palette }
  } = props.theme.meta!;
  const { isLoading, isError, data, error } = useQueryAllMarkdownStories();

  useEffect(() => {
    const failureCase = isError || (data && !data.collection);
    if (failureCase) {
      log(
        'error',
        JSON.stringify(error ?? '[anthology] collection fetching error.')
      );
      redirect('/404');
    }
  }, [isError, error]);

  return !isLoading && data && data.collection ? (
    <ThemeProvider
      value={{ darkMode: false, font, palette, treatmentId: props.theme.id }}
    >
      <Nav />
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
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'Season One',
            'p',
            {
              customStyles: {
                fontSize: 40,
                fontWeight: '200',
                color: palette.headingPrimaryColor
              }
            }
          )}
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
    </ThemeProvider>
  ) : (
    <Container customStyles={pageStyles}>
      <Spinner />
    </Container>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async (_ctx) => {
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

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: 'markdown',
    queryFn: getStories
  });

  return { props: { dehydratedState: dehydrate(queryClient), theme } };
};

export default AnthologyPage;
