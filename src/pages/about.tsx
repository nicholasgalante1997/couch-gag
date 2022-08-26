import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MetricType } from '@nickgdev/couch-gag-common-lib';
import { Container, _heller_base } from '@nickgdev/hellerui';

import { OneCol } from '../components/widgets/OneCol.widget';
import { useThemeContext } from '../contexts';
import { emit } from '../service/metric';
import { forwardVarText, getSafeFontKey } from '../utils';
import SlideIn from '../components/animated/SlideIn';

const blurb =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ` as const;

  export function About() {
    const { font, palette } = useThemeContext();
    function renderAboutWidget() {
        return (
          <Container
            padding="1rem"
            customStyles={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {forwardVarText(getSafeFontKey(font.google.family), 'about', 'h1', {
              customStyles: {
                color: palette.headingPrimaryColor,
                margin: '0px',
                fontSize: '4rem',
              }
            })}
            <Container>
                {forwardVarText(getSafeFontKey(font.google.family), blurb, 'p', {
                customStyles: {
                    color: palette.headingPrimaryColor,
                    margin: '0px',
                    fontSize: '2rem'
                }
                })}
            </Container>
          </Container>
        );
      }
    return(
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
        childNode={renderAboutWidget()}
      />
    </Container>
    )
  }