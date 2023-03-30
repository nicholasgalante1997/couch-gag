import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ColorChars } from './ColorChars';

export default {
  title: 'components/animated/text/color wheel',
  component: ColorChars,
  argTypes: {
    children: {
        type: "string"
    }
  }
} as ComponentMeta<typeof ColorChars>;

const Template: ComponentStory<typeof ColorChars> = (args: any) => (
  <ColorChars {...args} />
);

export const Default = Template.bind({});
Default.args = {
    family: "Caveat - v17",
    impl: "h1",
    children: "React and Styled Components and Nonsense"
};
