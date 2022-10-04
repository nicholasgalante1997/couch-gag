import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { MetricType } from '@nickgdev/couch-gag-common-lib';
import { Button, Container } from '@nickgdev/hellerui';

import SlideIn from '../components/animated/slide-in';
import { OneCol } from '../components/widgets/OneCol.widget';
import { useThemeContext } from '../contexts';
import { emit } from '../service/metric';
import { useHomePageText } from '../store';
import { forwardVarText, getSafeFontKey } from '../utils';

function Home() {
  const { font, palette } = useThemeContext();
  const { push: redirect } = useRouter();
  const text = useHomePageText();

  useEffect(() => {
    emit({ metricName: MetricType.PAGE_VIEW, subfield: 'home-page', value: 1 });
  }, []);

  function handleOriginStoryClick() {
    redirect('/story/season-one?seasonKey=01&episodeKey=01');
  }

  function handleSignUpClick() {
    redirect('/auth');
  }

  function reduceImageSizeByFactor(
    f: number,
    imageDimensions: { height: number; width: number }
  ) {
    return {
      height: imageDimensions.height / f,
      width: imageDimensions.width / f
    };
  }

  function renderWidgetOne() {
    return (
      <Container
        padding="1rem"
        customStyles={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingBottom: '5rem'
        }}
      >
        {forwardVarText(
          getSafeFontKey(font.google.family),
          text.heroWidget.the,
          'h1',
          {
            customStyles: {
              color: '#fff',
              margin: '0px',
              fontSize: '4rem'
            }
          }
        )}
        {forwardVarText(
          getSafeFontKey(font.google.family),
          text.heroWidget.title,
          'h1',
          {
            customStyles: {
              color: '#fff',
              margin: '0px',
              marginBottom: '12px',
              fontSize: '4rem'
            }
          }
        )}
        <Container width="68%" customStyles={{ borderTop: '1px solid white' }}>
          {forwardVarText(
            getSafeFontKey(font.google.family),
            text.heroWidget.supportingNotion_1,
            'p',
            {
              customStyles: {
                color: palette.headingSecondaryColor,
                fontSize: '16px'
              }
            }
          )}
          {forwardVarText(
            getSafeFontKey(font.google.family),
            text.heroWidget.supportingNotion_1,
            'p',
            {
              customStyles: {
                color: palette.headingSecondaryColor,
                fontSize: '16px'
              }
            }
          )}
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
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            text.originWidget.title,
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
            text.originWidget.supportingNotion,
            'p',
            {
              customStyles: {
                color: palette.backgroundTertiaryColor,
                marginTop: '2rem',
                fontWeight: '800',
                paddingLeft: '3rem',
                textAlign: 'center'
              }
            }
          )}
          <Button
            ghost
            backgroundColor={palette.backgroundTertiaryColor}
            onClick={handleOriginStoryClick}
          >
            {forwardVarText(
              getSafeFontKey(font.google.family),
              text.originWidget.actionText,
              'span'
            )}
          </Button>
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
            <Container
              height={
                reduceImageSizeByFactor(
                  3,
                  text.originWidget.image.originalDimensions
                ).height
              }
              width={
                reduceImageSizeByFactor(
                  3,
                  text.originWidget.image.originalDimensions
                ).width
              }
            >
              <img
                src={text.originWidget.image.src}
                height="100%"
                width="100%"
              />
            </Container>
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
            <Container
              customStyles={{ overflow: 'visible' }}
              height={
                reduceImageSizeByFactor(
                  1.7,
                  text.supportingWidget.image.originalDimensions
                ).height
              }
              width={
                reduceImageSizeByFactor(
                  1.7,
                  text.supportingWidget.image.originalDimensions
                ).width
              }
            >
              <img
                src={text.supportingWidget.image.src}
                height="100%"
                width="100%"
              />
            </Container>
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
          {forwardVarText(
            getSafeFontKey(font.google.family),
            text.supportingWidget.title,
            'h3',
            {
              customStyles: {
                color: palette.backgroundComplimentColor,
                marginTop: '2rem',
                fontWeight: '800'
              }
            }
          )}
          <hr style={{ width: '90%' }} color={palette.backgroundColor} />
          {forwardVarText(
            getSafeFontKey(font.google.family),
            text.supportingWidget.supportingNotion,
            'p',
            {
              customStyles: {
                color: palette.backgroundComplimentColor,
                marginTop: '2rem',
                fontWeight: '800',
                paddingRight: '3rem',
                textAlign: 'center'
              }
            }
          )}
          <Button
            ghost
            backgroundColor={palette.buttonColorOptions[2]}
            onClick={handleSignUpClick}
          >
            {forwardVarText(
              getSafeFontKey(font.google.family),
              text.supportingWidget.actionText,
              'span'
            )}
          </Button>
        </Container>
      </Container>
    );
  }
  function renderWidgetFour() {
    return (
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
          text.tertiaryWidget.title,
          'h3',
          {
            customStyles: {
              color: palette.backgroundTertiaryColor,
              marginTop: '2rem',
              fontWeight: '800'
            }
          }
        )}
        <hr
          style={{ width: '90%' }}
          color={palette.backgroundComplimentColor}
        />
        {forwardVarText(
          getSafeFontKey(font.google.family),
          text.tertiaryWidget.supportingNotion,
          'p',
          {
            customStyles: {
              color: palette.backgroundTertiaryColor,
              marginTop: '2rem',
              fontWeight: '800',
              textAlign: 'center'
            }
          }
        )}
        <Button ghost backgroundColor={palette.buttonColorOptions[3]}>
          {forwardVarText(
            getSafeFontKey(font.google.family),
            text.tertiaryWidget.actionText,
            'span'
          )}
        </Button>
      </Container>
    );
  }

  return (
    <Container width="100%" padding="0rem" id="cg-home-page-wrapping-container">
      <OneCol
        widgetKey="home-page-widget-one"
        height="90vh"
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
        height="50vh"
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
          customStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}
        childNode={renderWidgetFour()}
      />
    </Container>
  );
}

export default Home;
