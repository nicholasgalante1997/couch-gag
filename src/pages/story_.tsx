import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Button,
  Container,
  Page,
  Typography,
  _heller_base
} from '@nickgdev/hellerui';
import {
  pageStyles,
  recursiveQueryParamConversion,
  parseUrlString,
  parseContent,
} from '../utils';
import { useQuerySingleMarkdownStory } from '../queries';
import { Spinner } from '../components/Spinner';
import { log } from 'couch-gag-common-lib';

const { Heading, Paragraph } = Typography;

export function StoryPage() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const queryParam = recursiveQueryParamConversion(
    {},
    parseUrlString(search)
  );

  const { data, error, isLoading, isError } = useQuerySingleMarkdownStory({ 
    seasonKey: queryParam?.seasonKey, 
    episodeKey: queryParam?.episodeKey 
  })

  const parsedContent = useMemo(() => parseContent(data?.content), [data]);

  React.useEffect(() => {
      if (isError) {
        log('error', JSON.stringify(error)); 
        navigate('/not-found');
      }
  }, [search, data]);

  if (isLoading) {
    return <Spinner />
  }

  return (data && parsedContent && parsedContent.body) ? (
    <Container
      radius="none"
      width={'100%'}
      padding="0px"
      margin="0px"
      customStyles={pageStyles}
    >
        <Page
          contentEngine="markdown"
          title={data.meta.title}
          titleColor="white"
          subtitle={data.meta.subtitle}
          content={parsedContent.body}
          padding="1rem"
          withDividers
          dividerProps={{
            fadeColor: 'white',
            focusColor: 'white'
          }}
          withActionBar={{
            actionTitle: (
              <Container
                margin="0px"
                padding="0px"
                width="100%"
                customStyles={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}
              >
                <Button
                  size="md"
                  className="btn-side-margin"
                  onClick={() => navigate('/')}
                  ghost
                  backgroundColor="#ffffff"
                >
                  back
                </Button>
                <Button
                  size="md"
                  className="btn-side-margin"
                  ghost
                  backgroundColor={_heller_base.colors.mcwatt.flickrPink}
                >
                  bookmark
                </Button>
              </Container>
            )
          }}
          customComponentMap={{
            h4: ({ node, ...props }: any) => (
              <Heading {...props} color="deeppink" as="h5" />
            ),
            p: ({ node, ...props}: any) => (
              <Paragraph {...props} color="white" fontSize={20} />
            ),
            a: ({ node, ...props }: any) => (
              <Paragraph
                {...props}
                color={_heller_base.colors.dunbar.lightCyan}
                thin
                fontSize={16}
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
  ) : (
    <Container
      radius="none"
      width={'100%'}
      padding="0px"
      margin="0px"
      customStyles={pageStyles}
    >
      <Spinner />
    </Container>
  );
}
