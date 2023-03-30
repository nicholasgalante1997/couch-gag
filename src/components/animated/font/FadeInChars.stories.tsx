import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FadeInChars } from './FadeInChars';

export default {
  title: 'components/animated/text/fade in',
  component: FadeInChars,
  argTypes: {
    children: {
        type: "string"
    }
  }
} as ComponentMeta<typeof FadeInChars>;

const Template: ComponentStory<typeof FadeInChars> = (args: any) => (
  <FadeInChars {...args} />
);

export const Default = Template.bind({});
Default.args = {
    family: "Caveat - v17",
    impl: "h1",
    children: "React and Styled Components and Nonsense, and a longer string of words to ensure fade in works nice."
};
