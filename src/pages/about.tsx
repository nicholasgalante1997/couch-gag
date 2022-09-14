import React from 'react';
import { Container } from '@nickgdev/hellerui';

import { OneCol } from '../components/widgets/OneCol.widget';
import { TwoColStaggered } from '../components/widgets/TwoColStaggered.widget';
import { useThemeContext } from '../contexts';
import { forwardVarText, getSafeFontKey } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { SlideIn } from '../components';

const blurb =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ` as const;

export default function About() {
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
            fontSize: '4rem'
          }
        })}
        <Container
          padding="1rem"
          customStyles={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
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
  function renderLeftAboutCol() {
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
        {forwardVarText(getSafeFontKey(font.google.family), 'our story', 'h1', {
          customStyles: {
            color: palette.headingPrimaryColor,
            margin: '0px',
            fontSize: '2rem'
          }
        })}
        <Container
          customStyles={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflowWrap: 'break-word'
          }}
        >
          {forwardVarText(getSafeFontKey(font.google.family), blurb, 'p', {
            customStyles: {
              color: palette.headingPrimaryColor,
              margin: '0px',
              fontSize: '1.5rem'
            }
          })}
        </Container>
      </Container>
    );
  }
  function renderRightAboutCol() {
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
        <Container height="100%" width="50%" padding="0px">
          <SlideIn
            fast
            dir="right"
            height={'100%'}
            padding="15px"
            customStyles={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%'
            }}
            shakeFast
          >
            <FontAwesomeIcon icon={faPeopleGroup} size="10x" color="#EC7628" />
          </SlideIn>
        </Container>
      </Container>
    );
  }
  function renderLowerAboutWidget() {
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
        {forwardVarText(
          getSafeFontKey(font.google.family),
          'second about',
          'h1',
          {
            customStyles: {
              color: palette.headingPrimaryColor,
              margin: '0px',
              fontSize: '4rem'
            }
          }
        )}
        <Container
          padding="1rem"
          customStyles={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
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
  return (
    <Container
      width="100%"
      padding="0rem"
      id="cg-about-page-wrapping-container"
    >
      <OneCol
        widgetKey="about-page-widget-one"
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
      <TwoColStaggered
        widgetKey="about-page-twocol-widget"
        leftSpan={7}
        rightSpan={5}
        leftNode={renderLeftAboutCol()}
        rightNode={renderRightAboutCol()}
      />
      <OneCol
        widgetKey="about-page-widget-one"
        height="60vh"
        containerProps={{
          customStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: '8vw'
          }
        }}
        childNode={renderLowerAboutWidget()}
      />
    </Container>
  );
}
