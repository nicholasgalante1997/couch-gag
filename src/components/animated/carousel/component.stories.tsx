import { Meta, Story } from '@storybook/react';
import Carousel from './index';
import { CarouselProps } from './types';

export default {
  title: 'components/animated/carousel',
  component: Carousel
} as Meta<CarouselProps>;

const Template: Story<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    <h1 key="heading_1">Some Text</h1>,
    <h2 key="heading_2">More Variable Text</h2>,
    <p key="paragraph">Longer variable text but not by much</p>
  ]
};
