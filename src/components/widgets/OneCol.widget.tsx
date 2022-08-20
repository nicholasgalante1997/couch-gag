import { Container } from '@nickgdev/hellerui';
import { ContainerProps } from '@nickgdev/hellerui/lib/components/Container/types';
import { useThemeContext } from '../../contexts';

export type OneColWidgetProps = {
  key: string;
  childNode?: JSX.Element | JSX.Element[];
  containerProps?: ContainerProps;
};

export function OneCol(props: OneColWidgetProps) {
  const { palette } = useThemeContext();
  const {
    key,
    childNode,
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
    <Container asGridParent radius="none" padding="0px" height="240px">
      <Container {...containerProps} asGridChild colSpan={12}>
        {childNode}
      </Container>
    </Container>
  );
}
