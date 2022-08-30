import { Metric, MetricType } from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';
import { useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';

import '../css/story-interact.css'
import { useThemeContext } from '../../contexts';

function getMetricType(s: string) {
  switch (s) {
    case 'page-view':
      return MetricType.PAGE_VIEW;
    case 'story-view':
      return MetricType.STORY_VIEW;
    case 'button-click':
      return MetricType.BUTTON_CLICK;
    case 'share':
      return MetricType.SHARE;
    default:
      return MetricType.ERROR;
  }
}

const StoryBar = () => {
  const { search } = useLocation();
  const { palette } = useThemeContext();

  return (
    <Container
      customStyles={{
        zIndex: 1,
        position: 'fixed',
        border: '1px solid black',
        bottom: '4vh',
        right: '4vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
      gradient={{
        flow: 'to bottom right',
        from: palette.backgroundComplimentColor,
        to: palette.backgroundColor
      }}
      radius="rounded"
      padding="8px"
    >
      <FontAwesomeIcon icon={faShareFromSquare} className="share couch-gag-icon" />
      <FontAwesomeIcon icon={faHeart} className="like couch-gag-icon" />
      <FontAwesomeIcon icon={faBookmark} className="bookmark couch-gag-icon" />
    </Container>
  );
};

export default StoryBar;