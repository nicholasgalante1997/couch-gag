import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import { log } from '@nickgdev/couch-gag-common-lib';
import { Container, Page } from '@nickgdev/hellerui';

import { Spinner } from '../../components/animated/spinner';
import { StoryInteract } from '../../components/story-interact';
import { useThemeContext, useBpContext } from '../../contexts';
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

function StickyTopSection(props: {
  isViewable: boolean;
  title: string;
}): JSX.Element {
  const { palette } = useThemeContext();
  return props.isViewable ? (
    <Container
      id="sp-sticky-top-sect"
      width="100%"
      height="48px"
      background={palette.backgroundComplimentColor}
    >
      {forwardVarText(getSafeFontKey('Caveat'), props.title, 'h1', {
        customStyles: {
          color: 'black'
        }
      })}
    </Container>
  ) : (
    <div id="zeroed" />
  );
}

function StoryPage() {
  const { push: redirect, query } = useRouter();
  const { palette, font } = useThemeContext();
  const { breakpointKeyName } = useBpContext();
  const [initialHeadingBottom, setInitialHeadingBottom] = useState<number>();

  const [isHeadingInView, setHeadingInView] = React.useState<boolean>(
    isStoryHeadingInView()
  );

  function isStoryHeadingInView(
    value?: boolean,
    callback?: React.Dispatch<React.SetStateAction<boolean>>
  ): boolean {
    if (typeof window === 'undefined') return true; // still on server here
    if (!initialHeadingBottom) return true; // pre-lifecycle hooks at this point, as were pre-render
    const isViewable = initialHeadingBottom > window.scrollY;
    if (typeof value !== 'undefined' && callback) {
      if (isViewable !== value) {
        callback(isViewable);
      }
    }
    return isViewable;
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined' && document) {
      setInitialHeadingBottom(
        document
          .querySelector(`#${selectors.storyHeading.container.id}`)!
          .getBoundingClientRect().bottom
      );
    }
  }, []);

  React.useEffect(() => {
    if (!initialHeadingBottom) return;
    const resizeEventWrapper = () =>
      isStoryHeadingInView(isHeadingInView, setHeadingInView);
    document.addEventListener('scroll', resizeEventWrapper);
    return () => document.removeEventListener('scroll', resizeEventWrapper);
  }, [initialHeadingBottom, isHeadingInView]);

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

  React.useEffect(() => {
    if (isError) {
      log('error', JSON.stringify(error));
      redirect('/not-found');
    }
  }, [query, data]);

  const parsedContent = useMemo(() => parseContent(data?.content), [data]);
  const ready = useMemo(
    () => reduceAndBool(data, data?.meta, parsedContent, parsedContent?.body),
    [data, parsedContent]
  );

  function renderPageHeading(
    t: string,
    s: string,
    a: string,
    genres: string[]
  ) {
    return (
      <Container
        width={
          breakpointKeyName === 'mobile' || breakpointKeyName === 'tablet'
            ? '100%'
            : '90%'
        }
        id={selectors.storyHeading.container.id}
        customStyles={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          borderBottom: '1px solid white',
          paddingBottom: '12px',
          ...(breakpointKeyName === 'mobile' || breakpointKeyName === 'tablet'
            ? { paddingLeft: '0.75rem' }
            : {})
        }}
      >
        {forwardVarText(getSafeFontKey('Caveat'), t, 'h1', {
          customStyles: {
            color: palette.headingSecondaryColor,
            lineHeight: 1.15,
            fontSize: '4rem'
          }
        })}
        {forwardVarText(getSafeFontKey(font.google.family), s, 'h5', {
          customStyles: {
            color: palette.paragraphTextColor,
            lineHeight: 1.15,
            fontSize: '1.15rem',
            marginTop: '0.75rem',
            width:
              breakpointKeyName === 'mobile' || breakpointKeyName === 'tablet'
                ? '100%'
                : '60%'
          }
        })}
        {forwardVarText(getSafeFontKey(font.google.family), a, 'span', {
          customStyles: {
            color: palette.paragraphTextColor,
            lineHeight: 1.15,
            fontSize: '1.15rem',
            marginTop: '0.75rem',
            width:
              breakpointKeyName === 'mobile' || breakpointKeyName === 'tablet'
                ? '100%'
                : '90%'
          }
        })}
        <Container
          width="100%"
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: '22px'
          }}
        >
          {genres.map((g) =>
            forwardVarText(getSafeFontKey('Caveat'), g, 'span', {
              customStyles: {
                padding: '4px 8px',
                marginRight: '8px',
                borderRadius: '4px',
                border: '1px solid ' + palette.backgroundComplimentColor,
                color: palette.backgroundComplimentColor
              }
            })
          )}
        </Container>
      </Container>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return ready ? (
    <Container width="100%" customStyles={{ ...pageStyles }}>
      <StoryInteract />
      <StickyTopSection
        title={data!.meta.title}
        isViewable={!isHeadingInView}
      />
      <Container
        radius="none"
        width={'90%'}
        padding="0px"
        margin="0px"
        customStyles={{ ...pageStyles }}
      >
        {renderPageHeading(
          data!.meta.title,
          data!.meta.subtitle ?? '',
          '- Washington Irving',
          data!.meta.genres
        )}
        <Page
          contentEngine="markdown"
          content={parsedContent!.body}
          title=""
          id={isHeadingInView ? '' : 'story-markup-page-content-pad-top'}
          dangerouslyOverrideInnerContentStyles={{
            styles: {
              maxWidth:
                breakpointKeyName === 'tablet' || breakpointKeyName === 'mobile'
                  ? '100%'
                  : '80%',
              width: 'auto',
              justifySelf: 'center',
              alignSelf: 'center',
              ...(breakpointKeyName === 'tablet' ||
              breakpointKeyName === 'mobile'
                ? { padding: '8px' }
                : {})
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