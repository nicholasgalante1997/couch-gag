import { Container } from '@nickgdev/hellerui';
import { ContainerProps } from '@nickgdev/hellerui/lib/components/Container/types';
import { useThemeContext } from '../../contexts';

export type OneColWidgetProps = {
  widgetKey?: string;
  height?: number | string;
  childNode?: JSX.Element | JSX.Element[];
  containerProps?: ContainerProps;
};

export function OneCol(props: OneColWidgetProps) {
  const { palette } = useThemeContext();
  const {
    childNode,
    height = '280px',
    containerProps = {
      customStyles: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      background: palette.buttonColorOptions[1]
    }
  } = props;
  return (
    <Container
      asGridParent
      radius="none"
      padding="0px"
      margin="0 auto"
      height={height}
    >
      <Container {...containerProps} asGridChild colSpan={12}>
        {childNode}
      </Container>
    </Container>
  );
}
