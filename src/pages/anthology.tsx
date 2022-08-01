import React from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Container,
  Typography,
  _heller_base
} from '@nickgdev/hellerui';
import { pageStyles } from '../utils';
import { useQueryAllMarkdownStories } from '../queries';
import { StoryRow } from '../components/StoryRow.widget';
import { Spinner } from '../components/Spinner';
import { log } from '@nickgdev/couch-gag-common-lib';

const { Paragraph } = Typography;

export function AnthologyPage() {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQueryAllMarkdownStories();

  React.useEffect(() => {
    const failureCase = isError || (data && !data.collection);
    if (failureCase) {
      log(
        'error',
        JSON.stringify(error ?? '[anthology] collection fetching error.')
      );
      navigate('/not-found');
    }
  }, [isError, error]);

  return !isLoading && data && data.collection ? (
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
        <Paragraph
          thin
          color={_heller_base.colors.mcwatt.flickrPink}
          fontSize={40}
        >
          Season One
        </Paragraph>
      </Container>
      {Object.keys(data.collection).map((s: any, i: number) => (
        <Container width={'90%'}>
          <StoryRow
            index={i}
            imgSrc={data.collection[s].img}
            title={data.collection[s].title}
            subtitle={data.collection[s].subtitle}
            genres={data.collection[s].genres ?? []}
            episodeKey={data.collection[s].episodeKey}
            seasonKey={data.collection[s].seasonKey}
          />
        </Container>
      ))}
    </Container>
  ) : (
    <Container customStyles={pageStyles}>
      <Spinner />
    </Container>
  );
}
