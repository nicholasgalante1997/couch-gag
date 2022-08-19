import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { log } from '@nickgdev/couch-gag-common-lib';

import { Container, Page, Typography, _heller_base } from '@nickgdev/hellerui';

import {
  pageStyles,
  recursiveQueryParamConversion,
  parseUrlString,
  parseContent,
  getSafeFontKey,
  forwardVarText
} from '../utils';
import { useQuerySingleMarkdownStory } from '../queries';
import { useThemeContext } from '../contexts';
import { Spinner } from '../components/animated/Spinner';
import { StoryInteract } from '../components/story-interact';

const { Heading, Paragraph } = Typography;

export function StoryPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { palette, font } = useThemeContext();

  const queryParam = recursiveQueryParamConversion({}, parseUrlString(search));

  const { data, error, isLoading, isError } = useQuerySingleMarkdownStory({
    seasonKey: queryParam?.seasonKey,
    episodeKey: queryParam?.episodeKey
  });

  const parsedContent = useMemo(() => parseContent(data?.content), [data]);

  React.useEffect(() => {
    if (isError) {
      log('error', JSON.stringify(error));
      navigate('/not-found');
    }
  }, [search, data]);

  if (isLoading) {
    return <Spinner />;
  }

  return data && parsedContent && parsedContent.body ? (
    <Container width="100%" customStyles={pageStyles}>
      <StoryInteract />
      <Container
        radius="none"
        width={'90%'}
        padding="0px"
        margin="0px"
        customStyles={pageStyles}
      >
        {data.meta?.img ? (
          <img
            alt="story image, a simpson couch gag cut"
            src={data.meta.img}
            style={{
              width: '100%',
              height: '300px',
              borderRadius: '4px',
              marginTop: '0.5rem'
            }}
          />
        ) : null}
        <Page
          contentEngine="markdown"
          title={data.meta.title}
          titleColor={palette.headingPrimaryColor}
          subtitle={data.meta.subtitle}
          content={parsedContent.body}
          padding="1rem"
          withDividers
          dividerProps={{
            fadeColor: 'white',
            focusColor: 'white'
          }}
          customComponentMap={{
            h4: ({ node, ...props }: any) =>
              forwardVarText(
                getSafeFontKey(font.google.family),
                props.children,
                'h4',
                {
                  ...props,
                  customStyles: {
                    color: palette.headingPrimaryColor
                  }
                }
              ),
            p: ({ node, ...props }: any) =>
              forwardVarText(
                getSafeFontKey(font.google.family),
                props.children,
                'p',
                {
                  ...props,
                  customStyles: {
                    fontSize: 16,
                    color: palette.paragraphTextColor
                  }
                }
              ),
            a: ({ node, ...props }: any) => (
              <Paragraph
                {...props}
                color={_heller_base.colors.dunbar.lightCyan}
                thin
                fontSize={12}
              />
            )
          }}
          dangerouslyOverrideInnerContentStyles={{
            styles: {
              maxWidth: '1000px',
              width: 'auto',
              justifySelf: 'center',
              alignSelf: 'center'
            }
          }}
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
