import { Container } from '@nickgdev/hellerui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShareFromSquare,
  faHeart,
  faBookmark
} from '@fortawesome/free-regular-svg-icons';

import css from '../css/story-interact.module.css';
import { useThemeContext } from '../../contexts';

const StoryBar = () => {
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
      <FontAwesomeIcon
        icon={faShareFromSquare}
        className={css['couch-gag-icon'] + ' ' + css['share']}
      />
      <FontAwesomeIcon
        icon={faHeart}
        className={css['couch-gag-icon'] + ' ' + css['like']}
      />
      <FontAwesomeIcon
        icon={faBookmark}
        className={css['couch-gag-icon'] + ' ' + css['bookmark']}
      />
    </Container>
  );
};

export default StoryBar;
