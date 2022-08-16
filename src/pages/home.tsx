import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MetricType } from '@nickgdev/couch-gag-common-lib';
import { Button, Container, _heller_base, Break } from '@nickgdev/hellerui';

import { useThemeContext } from '../contexts';
import { pageStyles, forwardVarText, getSafeFontKey } from '../utils';
import { emit } from '../service/metric';

export function Home() {
  const { darkMode, font, palette } = useThemeContext();

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
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'the couch gag',
        'h2',
        { customStyles: { color: palette.headingPrimaryColor } }
      )}
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
        {forwardVarText(
          getSafeFontKey(font.google.family),
          'this is a story about a lot of stories',
          'p',
          {
            customStyles: {
              color: palette.headingPrimaryColor,
              textAlign: 'center',
              fontWeight: '200'
            }
          }
        )}
        <Break />
        {forwardVarText(
          getSafeFontKey(font.google.family),
          "that's what an anthology is, if you're still fuzzy about that.",
          'p',
          {
            customStyles: {
              color: palette.headingPrimaryColor,
              textAlign: 'center',
              fontWeight: '200'
            }
          }
        )}
      </Container>
      <Break />
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
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'to the origin',
            'p'
          )}
        </Button>
        <Button
          onClick={navigateToBookMarkPage}
          ghost
          backgroundColor={_heller_base.colors.mcwatt.flickrPink}
          className="btn"
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'i have a bookmark',
            'p'
          )}
        </Button>
      </Container>
    </Container>
  );
}
