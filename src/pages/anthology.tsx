import React from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Container,
  Typography,
  _heller_base
} from '@nickgdev/hellerui';
import { pageStyles } from '../utils';
import { getStories } from '../service';
import { StoryRow } from '../components/StoryRow.widget';

const { Paragraph } = Typography;

export function AnthologyPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>();
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const stories = await getStories();
        console.log(stories);
        setData(stories);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
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
      {!isLoading &&
        data &&
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
  );
}
