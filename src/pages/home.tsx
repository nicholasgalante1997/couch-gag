import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MetricType } from '@nickgdev/couch-gag-common-lib';
import { Button, Container, _heller_base } from '@nickgdev/hellerui';

import { OneCol } from '../components/widgets/OneCol.widget';
import { TwoColStaggered } from '../components/widgets/TwoColStaggered.widget';
import { useThemeContext } from '../contexts';
import { emit } from '../service/metric';
import {
  forwardVarText,
  getSafeFontKey,
  CarouselTextOptions,
  carouselReviews
} from '../utils';
import Carousel from '../components/animated/Carousel';

export function Home() {
  const { darkMode, font, palette } = useThemeContext();

  const navigate = useNavigate();
  const navigateToAnthologyPage = () =>
    navigate('/story/season-one/?seasonKey=01&episodeKey=01');
  const navigateToBookMarkPage = () => navigate('/bookmarks');

  useEffect(() => {
    emit({ metricName: MetricType.PAGE_VIEW, subfield: 'home-page', value: 1 });
  }, []);

  function renderWidgetKeyOneLeftJsx() {
    return (
      <Container
        customStyles={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {forwardVarText(
          getSafeFontKey(font.google.family),
          'the couch gag',
          'h2',
          { customStyles: { color: palette.headingPrimaryColor } }
        )}
        <hr style={{ width: '70%' }} color={palette.backgroundTertiaryColor} />
        {forwardVarText(
          getSafeFontKey(font.google.family),
          'this is a story about a whole lot of stories',
          'p',
          { customStyles: { color: palette.paragraphTextColor } }
        )}
        {forwardVarText(
          getSafeFontKey(font.google.family),
          "that's what an anthology is, if you're still fuzzy about that.",
          'span',
          {
            customStyles: {
              color: palette.paragraphTextColor,
              textAlign: 'center',
              fontWeight: '200'
            }
          }
        )}
        <Container
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '0.5rem',
            width: '50%'
          }}
        >
          <Button
            onClick={navigateToAnthologyPage}
            backgroundColor={palette.buttonColorOptions[2]}
          >
            {forwardVarText(
              getSafeFontKey(font.google.family),
              'to the origin',
              'span',
              {
                customStyles: {
                  color: palette.backgroundColor,
                  textAlign: 'center',
                  fontWeight: '200'
                }
              }
            )}
          </Button>
          <Button
            onClick={navigateToBookMarkPage}
            backgroundColor={palette.buttonColorOptions[1]}
          >
            {forwardVarText(
              getSafeFontKey(font.google.family),
              'i have a bookmark',
              'span',
              {
                customStyles: {
                  color: palette.backgroundColor,
                  textAlign: 'center',
                  fontWeight: '200'
                }
              }
            )}
          </Button>
        </Container>
      </Container>
    );
  }

  function renderWidgetKeyOneRightJsx() {
    return (
      <Container
        id="home-page-widget-one-parent-container-right"
        className="home-page-widget-one-parent-container-right-cl"
        padding="0px"
        customStyles={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <Container
          id="home-page-widget-one-title-container-right"
          className="home-page-widget-one-title-container-right"
          padding="0px"
        >
          {forwardVarText(
            getSafeFontKey('Caveat' as CarouselTextOptions),
            'See what critics are saying about "The Couch Gag"',
            'h4',
            { customStyles: { color: palette.paragraphTextColor, fontWeight: '800', marginLeft: '1.25rem' } }
          )}
        </Container>
        <Container
          id="home-page-widget-one-carousel-container-right"
          className="home-page-widget-one-carousel-container-right"
          padding="0px"
          width="100%"
        >
          <Carousel items={renderCarouselItems()} />
        </Container>
      </Container>
    );
  }

  function renderCarouselItems(): JSX.Element[] {
    const cursiveFontFamily: CarouselTextOptions = 'Caveat';
    return carouselReviews.map((reviewTuple, index) => {
      return (
        <Container
          key={`home-page-review-${index}`}
          className="carousel-item"
          padding="0px"
          customStyles={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {forwardVarText(getSafeFontKey(cursiveFontFamily), reviewTuple[1], 'h4', {
              customStyles: {
                color: palette.backgroundTertiaryColor,
                fontSize: '2rem'
              }
          })}
          {forwardVarText(getSafeFontKey(font.google.family), `- ${reviewTuple[0]}`, 'code', {
              customStyles: {
                color: palette.paragraphTextColor,
                fontSize: '12px'
              }
          })}
        </Container>
      );
    });
  }

  return (
    <Container width="100%" padding="0rem" id="cg-home-page-wrapping-container">
      <TwoColStaggered
        key="1"
        leftNode={renderWidgetKeyOneLeftJsx()}
        rightNode={renderWidgetKeyOneRightJsx()}
        rightContainerProps={{ background: palette.backgroundComplimentColor }}
      />
      <OneCol key="2" />
    </Container>
  );
}
