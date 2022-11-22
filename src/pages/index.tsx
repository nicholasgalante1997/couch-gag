import React from 'react';
import { useRouter } from 'next/router';

import { Button, Container } from '@nickgdev/hellerui';

import { OneCol } from '../components/widgets/OneCol.widget';
import { useBpContext, useThemeContext } from '../contexts';
import { useHomePageText } from '../store';
import { forwardVarText, getSafeFontKey } from '../utils';
import { WonderBall } from '../components/animated/bouncing-ball/styles';
import { WonderBallSize } from '../components/animated/bouncing-ball/types';

function Home() {
  const { font, palette } = useThemeContext();
  const { push: redirect } = useRouter();
  const text = useHomePageText();

  const bp = useBpContext();

  const mobile = React.useMemo(() => bp.breakpointKeyName === 'mobile', [bp]);

  function handleOriginStoryClick() {
    redirect('/s/one?seasonKey=01&episodeKey=01');
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
        {forwardVarText(getSafeFontKey('Caveat'), text.heroWidget.the, 'h1', {
          customStyles: {
            color: '#fff',
            margin: '0px',
            fontSize: '4rem'
          }
        })}
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
          {forwardVarText(
            getSafeFontKey('Caveat'),
            text.heroWidget.title,
            'h1',
            {
              customStyles: {
                color: '#fff',
                margin: '0px',
                marginBottom: '12px',
                fontSize: '5rem'
              }
            }
          )}
          <WonderBall
            size={WonderBallSize.SMALL}
            color={palette.headingSecondaryColor!}
            repeat={1}
            style={{ marginLeft: '0.75rem', marginTop: '1.5rem' }}
          />
        </Container>
        <Container
          width={mobile ? '90%' : '68%'}
          customStyles={{ borderTop: '1px solid white' }}
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            text.heroWidget.supportingNotion_1,
            'p',
            {
              customStyles: {
                color: palette.backgroundComplimentColor,
                fontSize: '16px'
              }
            }
          )}
          <Button
            onClick={handleOriginStoryClick}
            size={'md'}
            width={mobile ? '100%' : '144px'}
            height={'36px'}
            backgroundColor={palette.backgroundComplimentColor}
            ghost
          >
            {forwardVarText(
              getSafeFontKey(font.google.family),
              text.heroWidget.actionButtonText,
              'span'
            )}
          </Button>
        </Container>
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
