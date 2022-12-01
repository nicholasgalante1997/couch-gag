import { Story, Meta } from '@storybook/react';
import SlideIn from './index';
import { SlideProps } from './types';

export default {
  title: 'components/animated/slide-in',
  component: SlideIn
} as Meta<SlideProps>;

const Template: Story<SlideProps> = (args: SlideProps) => (
  <SlideIn {...args}>
    <div style={{ height: '100px', width: '100px', background: 'red' }}>
      <p>slide in component</p>
    </div>
  </SlideIn>
);

export const Default = Template.bind({});
Default.args = {
  dir: 'right',
  shake: true
};
