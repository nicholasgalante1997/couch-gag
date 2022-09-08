import React, { useEffect } from 'react';
import { MetricType } from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';

import { useThemeContext } from '../contexts';
import { forwardVarText, getSafeFontKey } from '../utils';
import { emit } from '../service/metric';
import SlideIn from '../components/animated/slide-in';
import { OneCol } from '../components/widgets/OneCol.widget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { faPersonFallingBurst } from '@fortawesome/free-solid-svg-icons';
import { faPoo } from '@fortawesome/free-solid-svg-icons';

const blurb =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ` as const;

function Home() {
  const { font, palette } = useThemeContext();

  useEffect(() => {
    emit({ metricName: MetricType.PAGE_VIEW, subfield: 'home-page', value: 1 });
  }, []);

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
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            'p',
            {
              customStyles: {
                color: palette.backgroundTertiaryColor,
                marginTop: '2rem',
                fontWeight: '800',
                paddingLeft: '3rem'
              }
            }
          )}
        </Container>
        <Container height="100%" width="50%" padding="0px">
          <SlideIn
            fast
            dir="right"
            height={'100%'}
            padding="0px"
            customStyles={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%'
            }}
            shakeFast
          >
            <FontAwesomeIcon icon={faCouch} size="10x" color="#EC7628" />
          </SlideIn>
        </Container>
      </Container>
    );
  }

  function renderWidgetThree() {
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
        <Container height="100%" width="50%" padding="0px">
          <SlideIn
            fast
            dir="left"
            height={'100%'}
            padding="0px"
            customStyles={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%'
            }}
            shakeFast
          >
            <FontAwesomeIcon
              icon={faPersonFallingBurst}
              className="fa-duotone"
              size="10x"
              color="#6665FE"
            />
          </SlideIn>
        </Container>
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
          {forwardVarText(getSafeFontKey(font.google.family), 'The Bad', 'h3', {
            customStyles: {
              color: palette.backgroundComplimentColor,
              marginTop: '2rem',
              fontWeight: '800'
            }
          })}
          <hr style={{ width: '90%' }} color={palette.backgroundColor} />
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            'p',
            {
              customStyles: {
                color: palette.backgroundComplimentColor,
                marginTop: '2rem',
                fontWeight: '800',
                paddingRight: '3rem'
              }
            }
          )}
        </Container>
      </Container>
    );
  }
  function renderWidgetFour() {
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
            'The Ugly',
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
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            'p',
            {
              customStyles: {
                color: palette.backgroundTertiaryColor,
                marginTop: '2rem',
                fontWeight: '800',
                paddingLeft: '3rem'
              }
            }
          )}
        </Container>
        <Container height="100%" width="50%" padding="0px">
          <SlideIn
            fast
            dir="right"
            height={'100%'}
            padding="0px"
            customStyles={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%'
            }}
            shakeFast
          >
            <FontAwesomeIcon icon={faPoo} size="10x" color="#6F5E3D" />
          </SlideIn>
        </Container>
      </Container>
    );
  }

  return (
    <Container width="100%" padding="0rem" id="cg-home-page-wrapping-container">
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
        childNode={renderWidgetThree()}
      />
      <OneCol
        widgetKey="home-page-widget-four"
        containerProps={{
          background: palette.backgroundComplimentColor
        }}
        childNode={renderWidgetFour()}
      />
    </Container>
  );
}

export default Home;
