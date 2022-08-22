import { Container } from '@nickgdev/hellerui';
import { ContainerProps } from '@nickgdev/hellerui/lib/components/Container/types';
import { useThemeContext } from '../../contexts';

export type TwoColStaggeredProps = {
  key: string;
  leftNode?: JSX.Element | JSX.Element[];
  leftSpan?: number;
  rightNode?: JSX.Element | JSX.Element[];
  rightSpan?: number;
  leftContainerProps?: ContainerProps;
  rightContainerProps?: ContainerProps;
};

export function TwoColStaggered(props: TwoColStaggeredProps) {
  const { palette } = useThemeContext();
  const {
    leftNode,
    rightNode,
    leftSpan = 5,
    rightSpan = 7,
    key,
    leftContainerProps = {
      id: 'cg-staggered-left-widget-' + key,
      background: palette.backgroundColor
    },
    rightContainerProps = {
      id: 'cg-staggered-right-widget-' + key,
      background: palette.headingPrimaryColor
    }
  } = props;
  return (
    <Container
      radius="none"
      asGridParent
      padding="0px"
      height="280px"
      customStyles={{ marginLeft: '1%' }}
    >
      <Container
        {...leftContainerProps}
        padding="0px"
        asGridChild
        radius="none"
        colSpan={leftSpan}
      >
        {leftNode}
      </Container>
      <Container
        {...rightContainerProps}
        padding="0px"
        asGridChild
        radius="none"
        colSpan={rightSpan}
      >
        {rightNode}
      </Container>
    </Container>
  );
}
