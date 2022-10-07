import { Meta, Story } from '@storybook/react';
import { WonderBall } from './styles';
import { WonderBallProps, WonderBallSize } from './types';

export default {
  title: 'components/animated/bouncing-ball',
  component: WonderBall
} as Meta;

const Template: Story<WonderBallProps> = (args: WonderBallProps) => (
  <WonderBall {...args} />
);

export const Small = Template.bind({});
Small.args = {
  color: 'deeppink',
  size: WonderBallSize.SMALL,
  repeat: 1
};

export const Medium = Template.bind({});
Medium.args = {
  color: 'violet',
  size: WonderBallSize.MED,
  repeat: 1
};

export const Large = Template.bind({});
Large.args = {
  color: 'yellow',
  size: WonderBallSize.LG,
  repeat: 1
};
