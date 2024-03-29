import { Container } from '@nickgdev/hellerui';
import { ContainerProps } from '@nickgdev/hellerui/lib/components/Container/types';
import { Properties } from 'csstype';
import { useThemeContext } from '../../contexts';

export type TwoColStaggeredProps = {
  widgetKey?: string;
  leftNode?: JSX.Element | JSX.Element[];
  leftSpan?: number;
  rightNode?: JSX.Element | JSX.Element[];
  rightSpan?: number;
  leftContainerProps?: ContainerProps;
  rightContainerProps?: ContainerProps;
  className?: string;
  id?: string;
  styles?: Properties;
};

export function TwoColStaggered(props: TwoColStaggeredProps) {
  const { palette } = useThemeContext();
  const {
    leftNode,
    rightNode,
    leftSpan = 5,
    rightSpan = 7,
    widgetKey = 'two-col',
    leftContainerProps = {
      id: 'cg-staggered-left-widget-' + widgetKey,
      background: palette.backgroundColor
    },
    rightContainerProps = {
      id: 'cg-staggered-right-widget-' + widgetKey,
      background: palette.headingPrimaryColor
    },
    className,
    id,
    styles = {}
  } = props;
  return (
    <Container
      radius="none"
      asGridParent
      padding="0px"
      height="280px"
      customStyles={{ marginLeft: '1%', ...styles }}
      className={className}
      id={id}
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
