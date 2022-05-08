import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button, Container, Page, Typography, _heller_base } from '@nickgdev/hellerui';
import {
  pageStyles,
  recursiveQueryParamConversion,
  parseUrlString,
  parseContent
} from '../utils';
import { getStoryByStoryKey } from '../service';
import { Story } from '../types';

const { Heading, Paragraph } = Typography;

export function StoryPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [data, setData] = React.useState<Story>();

  React.useEffect(() => {
    (async () => {
      const queryParam = recursiveQueryParamConversion(
        {},
        parseUrlString(search)
      );
      const story = await getStoryByStoryKey({
        seasonKey: queryParam.seasonKey,
        episodeKey: queryParam.episodeKey
      });
      const parsedContent = parseContent(story.content);
      console.log(parsedContent);
      setData({ ...story, content: parsedContent.body });
    })();
  }, []);

  return (
    <Container
      radius="none"
      width={'100%'}
      padding="0px"
      margin="0px"
      customStyles={{ ...pageStyles, justifyContent: 'flex-start' }}
    >
      {!!data ? (
        <Page
          contentEngine="markdown"
          title={data.meta.title}
          titleColor="deeppink"
          subtitle={data.meta.subtitle}
          content={data.content}
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
              h4: ({ node, ...props }: any) => <Heading {...props} color="deeppink" as='h5' />,
              a: ({ node, ...props }: any) => <Paragraph {...props} color={_heller_base.colors.dunbar.lightCyan} thin fontSize={16} />
          }}
        />
      ) : null}
    </Container>
  );
}
