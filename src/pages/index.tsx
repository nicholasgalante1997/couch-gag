import React from 'react';
import { useRouter } from 'next/router';

import { Button, Container } from '@nickgdev/hellerui';

import { OneCol } from '../components/widgets/OneCol.widget';
import { useBpContext, useThemeContext } from '../contexts';
import { useHomePageText } from '../store';
import { getSafeFontKey } from '../utils';
import { WonderBall } from '../components/animated/bouncing-ball/styles';
import { WonderBallSize } from '../components/animated/bouncing-ball/types';
import { Font } from '../components';

function Home() {
  const { font, palette, darkMode } = useThemeContext();
  const { push: redirect } = useRouter();
  const text = useHomePageText();

  const bp = useBpContext();

  const mobile = React.useMemo(() => bp.breakpointKeyName === 'mobile', [bp]);

  function handleOriginStoryClick() {
    redirect('/s/one?seasonKey=01&episodeKey=01');
  }

  function renderTitle() {
    return (
      <>
        <Font
          family={getSafeFontKey('Caveat')}
          impl="h1"
          {...{
            customStyles: {
              color: darkMode ? '#fff' : '#000',
              margin: '0px',
              fontSize: '4rem'
            }
          }}
        >
          {text.heroWidget.the}
        </Font>
        <Container
          margin="0"
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-2rem',
            overflow: 'visible',
            position: 'relative'
          }}
        >
          <Font
            family={getSafeFontKey('Caveat')}
            impl="h1"
            {...{
              customStyles: {
                color: darkMode ? '#fff' : '#000',
                margin: '0px',
                marginBottom: '12px',
                fontSize: '5rem'
              }
            }}
          >
            {text.heroWidget.title}
          </Font>
          <WonderBall
            size={WonderBallSize.SMALL}
            color={
              darkMode ? palette.headingSecondaryColor! : 'rgb(242, 7, 117)'
            }
            repeat={1}
            style={{ marginLeft: '0.75rem', marginTop: '1.5rem' }}
          />
        </Container>
      </>
    );
  }

  function renderSubtextAction() {
    return (
      <Container
        width={mobile ? '90%' : '68%'}
        customStyles={{ borderTop: '1px solid white' }}
      >
        <Font
          family={getSafeFontKey(font.google.family)}
          impl="p"
          {...{
            customStyles: {
              color: palette.backgroundComplimentColor,
              fontSize: '16px'
            }
          }}
        >
          {text.heroWidget.supportingNotion_1}
        </Font>
        <Button
          onClick={handleOriginStoryClick}
          size={'md'}
          width={mobile ? '100%' : '244px'}
          height={'36px'}
          backgroundColor={palette.backgroundComplimentColor}
          ghost
        >
          <Font family={getSafeFontKey(font.google.family)} impl="span">
            {text.heroWidget.actionButtonText}
          </Font>
        </Button>
      </Container>
    );
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
        {renderTitle()}
        {renderSubtextAction()}
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
            paddingLeft: '8vw',
            overflow: 'hidden'
          }
        }}
        childNode={renderWidgetOne()}
      />
    </Container>
  );
}

export default Home;
