import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MetricType } from '@nickgdev/couch-gag-common-lib';
import {
  Button,
  Container,
  HellerDivider,
  _heller_base
} from '@nickgdev/hellerui';

import { TwoColStaggered } from '../components/widgets/TwoColStaggered.widget';
import { useThemeContext } from '../contexts';
import { emit } from '../service/metric';
import { forwardVarText, getSafeFontKey } from '../utils';
import { OneCol } from '../components/widgets/OneCol.widget';

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
        <hr style={{ width: '70%' }} color={palette.paragraphTextColor} />
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
                  color: palette.paragraphTextColor,
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
                  color: palette.paragraphTextColor,
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

  return (
    <Container padding="0rem" id="cg-home-page-wrapping-container">
      <TwoColStaggered key="1" leftNode={renderWidgetKeyOneLeftJsx()} />
      <OneCol key="2" />
    </Container>
  );
}
