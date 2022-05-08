import React from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Typography,
  Container,
  _heller_base
} from '@nickgdev/hellerui';
import { pageStyles } from '../utils';

const { Heading, Paragraph } = Typography;

export function Home() {
  const navigate = useNavigate();
  const navigateToAnthologyPage = () => navigate('/anthology');
  const navigateToBookMarkPage = () => navigate('/bookmarks');

  return (
    <Container
      radius="none"
      width={'100%'}
      padding="0px"
      margin="0px"
      customStyles={pageStyles}
    >
      <Heading as="h5" color="rgba(270,270,270,0.85)">
        ulysses
      </Heading>
      <hr style={{ width: '20%', border: '1px solid white' }} />
      <Container
        padding="1rem"
        customStyles={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paragraph
          customStyles={{ textAlign: 'center' }}
          thin
          color="rgba(270,270,270,0.85)"
        >
          this is a story about a lot of stories.
          <br />
          that's what an anthology is, if you're still fuzzy about that.
          <br />
        </Paragraph>
      </Container>
      <Container
        padding="1rem"
        customStyles={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'space-between',
          justifyContent: 'center'
        }}
      >
        <Button
          onClick={navigateToAnthologyPage}
          ghost
          backgroundColor={_heller_base.colors.dunbar.lightCyan}
          className="btn"
        >
          browse anthology
        </Button>
        <Button
          onClick={navigateToBookMarkPage}
          ghost
          backgroundColor={_heller_base.colors.mcwatt.flickrPink}
          className="btn"
        >
          i have a bookmark
        </Button>
      </Container>
    </Container>
  );
}
