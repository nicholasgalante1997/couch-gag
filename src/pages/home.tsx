import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MetricType } from '@nickgdev/couch-gag-common-lib';
import { Button, Container, _heller_base, Break } from '@nickgdev/hellerui';

import { useThemeContext } from '../contexts';
import { pageStyles, forwardVarText, getSafeFontKey } from '../utils';
import { emit } from '../service/metric';
import { url } from 'inspector';

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
    <Container padding="0">
      <Container
        radius="none"
        width={'100%'}
        padding="0px"
        margin="0px"
        asGridParent
        customStyles={{
          justifyContent: 'space-around'
        }}
      >
        <Container asGridChild colSpan={4}>
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'the couch gag',
            'h2',
            {
              customStyles: {
                color: palette.headingPrimaryColor,
                textAlign: 'center'
              }
            }
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
            padding="0"
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
        <Container>
          <img
            src="https://res.cloudinary.com/ademeo/image/upload/v1660788722/couch-gag/couch-gag-ice-shelf_eagwri.webp"
            alt="couch-gag-ice-shelf"
          />
        </Container>
      </Container>
      <Container
        asGridParent
        className="banner1"
        background={_heller_base.colors.mcwatt.flickrPink}
        padding="0"
      >
        <Container asGridChild colSpan={6} className="banner1col1" padding="0">
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
        </Container>
        <Container
          asGridChild
          colSpan={6}
          className="banner1col2"
          height={300}
          padding="0"
        >
          <img
            src="https://res.cloudinary.com/ademeo/image/upload/v1660789366/couch-gag/broken-ice-banner.jpg"
            alt="broken-ice-banner"
            style={{
              objectFit: 'scale-down'
            }}
          />
        </Container>
      </Container>
      <Container
        className="banner2"
        colSpan={12}
        height={300}
        background="darkgreen"
        padding="0"
      >
        {forwardVarText(
          getSafeFontKey(font.google.family),
          `let's throw a header over here`,
          'h1',
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
          `let's throw a smaller header over here`,
          'h3',
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
          `Maybe even some p tag text over hereeee`,
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
      <Container padding="0">
        {forwardVarText(
          getSafeFontKey(font.google.family),
          'footer links placeholder',
          'h1',
          {
            customStyles: {
              color: palette.headingPrimaryColor,
              textAlign: 'left',
              fontWeight: '200'
            }
          }
        )}
      </Container>
    </Container>
  );
}
