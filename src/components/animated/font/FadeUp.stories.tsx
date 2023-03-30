import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FadeUpChars } from './FadeUpChars';

export default {
  title: 'components/animated/text/fade up',
  component: FadeUpChars,
  argTypes: {
    children: {
        type: "string"
    }
  }
} as ComponentMeta<typeof FadeUpChars>;

const Template: ComponentStory<typeof FadeUpChars> = (args: any) => (
  <FadeUpChars {...args} />
);

export const Default = Template.bind({});
Default.args = {
    family: "Caveat - v17",
    impl: "h1",
    customStyles: { color: "#fff" },
    children: "React and Styled Components and Nonsense, and a longer string of words to ensure fade in works nice."
};
