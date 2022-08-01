import { Metric, MetricType } from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';
import { useLocation } from 'react-router';
import Action from './Action';
import { IconName } from './types';
import actionJson from './data/story-actions.json';

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

  return (
    <Container
      customStyles={{
        zIndex: 1,
        position: 'fixed',
        bottom: '4vh',
        right: '4vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
      width={'10vw'}
      background="white"
      radius="rounded"
    >
      {actionJson.actions.map((props) => {
        const metricType = getMetricType(props.metricType);
        const safeMetric: Metric<typeof metricType> = {
          metricName: metricType,
          subfield: search,
          value: 1
        };
        const actionProps = {
          ...props,
          icon: props.icon as IconName,
          metric: safeMetric
        };
        return <Action key={props._id} {...actionProps} />;
      })}
    </Container>
  );
};

export default StoryBar;
