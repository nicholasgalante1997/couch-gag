export type WonderBallProps = {
  color: string;
  size: WonderBallSize;
  repeat?: number | 'infinite';
};

export enum WonderBallSize {
  SMALL = 'SMALL',
  MED = 'MEDIUM',
  LG = 'LARGE'
}
