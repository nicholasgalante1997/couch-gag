import { Story, Meta } from '@storybook/react';
import { Hoverable } from './index';
import { HoverableProps } from './types';

export default {
  title: 'components/animated/hoverable',
  component: Hoverable
} as Meta<HoverableProps>;

const Template: Story<HoverableProps> = (args: HoverableProps) => (
  <Hoverable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  from: {
    height: '200px',
    width: '200px',
    borderRadius: '4px',
    border: '1px solid black',
    background: 'deeppink'
  },
  to: {
    height: '300px',
    width: '300px',
    transition: 'height 0.4s, width 0.4s'
  }
};
