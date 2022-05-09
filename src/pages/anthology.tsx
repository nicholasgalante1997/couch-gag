import React from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Container,
  Typography,
  _heller_base
} from '@nickgdev/hellerui';
import { pageStyles, resiliantTryCatch } from '../utils';
import { getStories } from '../service';
import { StoryRow } from '../components/StoryRow.widget';
import { Spinner } from '../components/Spinner';

const { Paragraph } = Typography;

export function AnthologyPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const result = await resiliantTryCatch(async () => {
        const stories = await getStories();
        console.log(stories);
        setData(stories);
        setIsLoading(false);
      }, 3);

      if (result && result.isError) {
        setIsLoading(false);
        navigate('/not-found');
      }
    })();
  }, []);

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
      <Container
        customStyles={{
          ...pageStyles,
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '5vh'
        }}
        width="100%"
        padding="1rem"
      >
        <Button
          onClick={() => navigate('/')}
          ghost
          backgroundColor="#ffffff"
          size="lg"
        >
          back to home
        </Button>
      </Container>
      <Container width="100%">
        <Paragraph
          thin
          color={_heller_base.colors.mcwatt.flickrPink}
          fontSize={40}
        >
          Season One
        </Paragraph>
      </Container>
      {
        Object.keys(data.collection).map((s: any, i: number) => (
          <Container width={'100%'}>
            <StoryRow
              index={i}
              imgSrc={data.collection[s].img}
              title={data.collection[s].title}
              subtitle={data.collection[s].subtitle}
              genres={data.collection[s].genres}
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
