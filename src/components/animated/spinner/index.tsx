import css from '../../css/Spinner.module.css';
import { WithFlexibleHtmlDataProps } from '../../../types';

type SpinnerProps = WithFlexibleHtmlDataProps;

export function Spinner(props: SpinnerProps) {
  return <div {...props} className={css.spinner} />;
}
