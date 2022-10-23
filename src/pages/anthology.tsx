import React, { useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';
import { log } from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';

import {
  forwardVarText,
  getSafeFontKey,
  pageStyles,
  reduceAndBool
} from '../utils';
import { useThemeContext } from '../contexts';
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

function AnthologyPage() {
  const { push: redirect } = useRouter();
  const { palette } = useThemeContext();
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
        !isLoading,
        data,
        data?.collection,
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
      <Container width="90%">
        {forwardVarText(getSafeFontKey('Caveat'), anthText.seasonOne, 'h1', {
          customStyles: {
            fontSize: 40,
            fontWeight: '200',
            color: palette.paragraphTextColor
          }
        })}
        {forwardVarText(
          getSafeFontKey('Caveat'),
          anthText.seasonOneShort,
          'p',
          {
            customStyles: {
              fontSize: 20,
              fontWeight: 'bold',
              color: palette.backgroundComplimentColor,
              width: '70%'
            }
          }
        )}
        {forwardVarText(
          getSafeFontKey('Caveat'),
          `- ${anthText.seasonOneAuthor}`,
          'span',
          {
            customStyles: {
              fontSize: 32,
              marginBottom: '1rem',
              fontWeight: 'bold',
              color: palette.backgroundComplimentColor,
              float: 'right'
            }
          }
        )}
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
          asGridParent
          padding="0px"
          customStyles={{ flexWrap: 'wrap', overflow: 'visible' }}
        >
          {Object.keys(data!.collection).map((s: any, i: number) => (
            <AnthologyTile
              key={`${data!.collection[s].episodeKey}-${i}`}
              title={data!.collection[s].title}
              desc={data!.collection[s].subtitle}
              cardKey={`${data!.collection[s].seasonKey}-${
                data!.collection[s].episodeKey
              }`}
              genres={data!.collection[s].genres}
              navigationFn={() => {
                redirect(
                  `/story/season-one?seasonKey=01&episodeKey=${
                    data!.collection[s].episodeKey
                  }`
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
