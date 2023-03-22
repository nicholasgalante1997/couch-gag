import React, { useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';
import { log } from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';

import {
  getSafeFontKey,
  pageStyles,
  reduceAndBool,
  findNestedParagraphPaletteTheme
} from '../utils';
import { useBpContext, useThemeContext } from '../contexts';
import { getStories } from '../service';
import { useQueryAllMarkdownStories } from '../queries';

import { AnthologyTile } from '../components/cards/anthology';
import { Spinner } from '../components/animated/spinner';
import {
  AnthException,
  AnthExceptionEnum,
  EXCEPTION_DELIMITER
} from '../exceptions';
import { useAnthText } from '../store';
import { Font } from '../components';

function AnthologyPage() {
  const { push: redirect } = useRouter();
  const { palette, darkMode } = useThemeContext();
  const { breakpointKeyName } = useBpContext();
  const { isLoading, isError, data, error } = useQueryAllMarkdownStories();
  const anthText = useAnthText();

  useEffect(() => {
    const failureCase = isError || (data && !data.collection);
    if (failureCase) {
      let errorType: AnthExceptionEnum;
      if (typeof error === 'string' && error.includes('ulysses'))
        errorType = AnthExceptionEnum.ULYSSES_VERIFICATION;
      else if (
        typeof error === 'string' &&
        !error.includes('ulysses') &&
        Object.keys(data?.collection ?? {}).length === 0
      )
        errorType = AnthExceptionEnum.EMPTY_COLLECTION;
      else errorType = AnthExceptionEnum.NETWORK;
      log(
        'error',
        new AnthException(errorType).message +
          EXCEPTION_DELIMITER +
          `relayed error ::: ${error}`
      );
      redirect('/404');
    }
  }, [isError, error]);

  const ready = useMemo(
    () =>
      reduceAndBool(
        !isLoading /** check were in a non loading state */,
        data /** check we have a valid data object as the result of the query */,
        data?.collection /** check weve loaded a valid season */,
        Object.keys(data?.collection ?? {}).length > 0
      ),
    [isLoading, data]
  );

  return ready ? (
    <Container
      radius="none"
      width={'100%'}
      padding="0px"
      margin="0px"
      customStyles={{
        ...pageStyles,
        justifyContent: 'flex-start',
        minHeight: '90vh'
      }}
    >
      <Container
        padding="12px"
        width={
          breakpointKeyName === 'mobile' || breakpointKeyName === 'tablet'
            ? '100%'
            : '90%'
        }
      >
        <Font
          family={getSafeFontKey('Caveat')}
          impl="h1"
          {...{
            customStyles: {
              fontSize: 40,
              fontWeight: '200',
              color: darkMode ? findNestedParagraphPaletteTheme(palette.paragraphTextColor) : palette.headingPrimaryColor
            }
          }}
        >
          {anthText.seasonOne}
        </Font>
        <Font
          family={getSafeFontKey('Caveat')}
          impl="p"
          {...{
            customStyles: {
              fontSize: 20,
              fontWeight: 'bold',
              color: palette.backgroundComplimentColor,
              width:
                breakpointKeyName === 'mobile' || breakpointKeyName === 'tablet'
                  ? '100%'
                  : '70%'
            }
          }}
        >
          {anthText.seasonOneShort}
        </Font>
        <Font
          family={getSafeFontKey('Caveat')}
          impl="span"
          {...{
            customStyles: {
              fontSize: 32,
              marginBottom: '1rem',
              fontWeight: 'bold',
              color: palette.backgroundComplimentColor,
              float: 'right'
            }
          }}
        >
          {`- ${anthText.seasonOneAuthor}`}
        </Font>
        <hr
          color={
            typeof palette.paragraphTextColor === 'string'
              ? palette.paragraphTextColor
              : palette.paragraphTextColor[0]
          }
          style={{ width: '100%' }}
        />
      </Container>
      <Container
        width="90%"
        padding="0px"
        customStyles={{
          overflow: 'visible',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}
      >
        <Container
          padding="0px"
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            overflow: 'visible',
            width: '100%'
          }}
        >
          {Object.keys(data!.collection['season_01']).map(
            (s: any, i: number) => {
              const story = data!.collection['season_01'][s];
              return (
                <AnthologyTile
                  key={`${story.episodeKey}-${i}`}
                  title={story.title}
                  desc={story.subtitle}
                  cardKey={`${story.seasonKey}-${story.episodeKey}`}
                  genres={story.genres}
                  navigationFn={() => {
                    redirect(
                      `/s/one?seasonKey=01&episodeKey=${story.episodeKey}`
                    );
                  }}
                />
              );
            }
          )}
        </Container>
      </Container>
    </Container>
  ) : (
    <Container customStyles={pageStyles}>
      <Spinner />
    </Container>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: 'markdown',
    queryFn: getStories
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default AnthologyPage;
