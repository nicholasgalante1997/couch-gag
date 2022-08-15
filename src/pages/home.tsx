import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Typography,
  Container,
  _heller_base
} from '@nickgdev/hellerui';
import { useThemeContext } from '../contexts';
import { pageStyles } from '../utils';
import { getThemedTextColor } from '../utils/theme';
import { emit } from '../service/metric';
import { MetricType } from '@nickgdev/couch-gag-common-lib';

const { Heading, Paragraph } = Typography;

export function Home() {
  const { darkMode } = useThemeContext();

  const navigate = useNavigate();
  const navigateToAnthologyPage = () =>
    navigate('/story/season-one/?seasonKey=01&episodeKey=01');
  const navigateToBookMarkPage = () => navigate('/bookmarks');

  useEffect(() => {
    emit({ metricName: MetricType.PAGE_VIEW, subfield: 'home-page', value: 1 });
  }, []);

  return (
    <Container
      radius="none"
      width={'100%'}
      padding="0px"
      margin="0px"
      customStyles={pageStyles}
    >
      <Heading as="h5" color={getThemedTextColor(darkMode)}>
        the couch gag
      </Heading>
      <hr
        style={{
          width: '20%',
          border: darkMode ? '1px solid white' : '1px solid navy'
        }}
      />
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
          color={getThemedTextColor(darkMode)}
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
          to the origin
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
