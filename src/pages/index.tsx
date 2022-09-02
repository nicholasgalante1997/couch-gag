import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  MetricType,
  Treatment,
  heller_couch_view_theme_treatment_pool as POOL,
  Theme,
  deriveCssClassname
} from '@nickgdev/couch-gag-common-lib';
import { Container, _heller_base } from '@nickgdev/hellerui';

import { ThemeProvider } from '../contexts';
import {
  forwardVarText,
  getSafeFontKey,
  serverThemeCacheInstance
} from '../utils';
import { getViewThemeTreatment } from '../service';
import { emit } from '../service/metric';
import { Nav } from '../components';
import SlideIn from '../components/animated/slide-in';
import { OneCol } from '../components/widgets/OneCol.widget';
import { GetServerSideProps } from 'next';

const blurb =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ` as const;

const defaultTheme = POOL.ViewThemeTreatments.filter(
  (vt) => vt.id.includes('major') && vt.id.includes('oswald')
)[0];

type HomePageProps = {
  theme: Treatment<Theme>;
};

function Home(props: HomePageProps) {
  const {
    theme: { font, palette }
  } = props.theme.meta!;

  const { push: redirect } = useRouter();
  const navigateToAnthologyPage = () =>
    redirect('/story/season-one/?seasonKey=01&episodeKey=01');

  useEffect(() => {
    emit({ metricName: MetricType.PAGE_VIEW, subfield: 'home-page', value: 1 });
  }, []);

  useEffect(() => {
    const { body } = document;
    body.setAttribute(
      'class',
      deriveCssClassname(palette.backgroundColor)?.css.bg ?? ''
    );
  }, [props.theme]);

  function renderWidgetOne() {
    return (
      <Container
        padding="1rem"
        customStyles={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        {forwardVarText(getSafeFontKey(font.google.family), 'the', 'h1', {
          customStyles: {
            color: palette.headingPrimaryColor,
            margin: '0px',
            fontSize: '4rem'
          }
        })}
        {forwardVarText(getSafeFontKey(font.google.family), 'couch gag', 'h1', {
          customStyles: {
            color: palette.headingPrimaryColor,
            margin: '0px',
            marginBottom: '12px',
            fontSize: '4rem'
          }
        })}
        <Container width="68%">
          {forwardVarText(getSafeFontKey(font.google.family), blurb, 'p', {
            customStyles: {
              color: palette.paragraphTextColor
            }
          })}
        </Container>
      </Container>
    );
  }

  function renderWidgetTwo() {
    return (
      <Container
        id="home-page-widget-two-parent-container"
        className="home-page-widget-two-parent-container-cl"
        padding="0px"
        customStyles={{
          display: 'flex',
          flexDirection: 'row'
        }}
        height="100%"
      >
        <Container
          height="100%"
          width="50%"
          padding="0px"
          customStyles={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center'
          }}
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'The Good',
            'h3',
            {
              customStyles: {
                color: palette.backgroundTertiaryColor,
                marginTop: '2rem',
                fontWeight: '800'
              }
            }
          )}
          <hr style={{ width: '90%' }} color={palette.backgroundColor} />
        </Container>
        <Container height="100%" width="50%" padding="0px">
          <SlideIn dir="right" customStyles={{ marginTop: '2rem' }}>
            <div id="placeholder" />
          </SlideIn>
        </Container>
      </Container>
    );
  }

  return (
    <ThemeProvider
      value={{ darkMode: false, font, palette, treatmentId: props.theme.id }}
    >
      <Nav />
      <Container
        width="100%"
        padding="0rem"
        id="cg-home-page-wrapping-container"
      >
        <OneCol
          widgetKey="home-page-widget-one"
          height="60vh"
          containerProps={{
            customStyles: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: '8vw'
            }
          }}
          childNode={renderWidgetOne()}
        />
        <OneCol
          widgetKey="home-page-widget-two"
          containerProps={{
            background: palette.backgroundComplimentColor
          }}
          childNode={renderWidgetTwo()}
        />
        <OneCol
          widgetKey="home-page-widget-three"
          containerProps={{
            background: palette.backgroundTertiaryColor
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let theme: Treatment<Theme>;

  if (!serverThemeCacheInstance.cache) {
    const { data, error } = await getViewThemeTreatment(
      undefined,
      undefined,
      undefined,
      ['major', 'oswald']
    );

    if (error) {
      theme = defaultTheme;
    } else {
      serverThemeCacheInstance.getCacheInstance(); // we know cache is undefined at this point
      serverThemeCacheInstance.setCacheInstance({
        k: 'theme',
        v: data.themeOptions[0]
      });
      theme = serverThemeCacheInstance.getCacheInstance().theme;
    }
  } else {
    theme = serverThemeCacheInstance.getCacheInstance().theme;
  }

  return { props: { theme } };
};

export default Home;
