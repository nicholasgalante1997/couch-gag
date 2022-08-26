import { SvgProps } from '../../types';

export default (props: SvgProps) => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block' }}
  >
    <path
      d="M13.5 8.25L17.25 12M17.25 12L13.5 15.75M17.25 12H6.75"
      stroke={props.fill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
