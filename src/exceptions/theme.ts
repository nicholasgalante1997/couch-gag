export enum ThemeExceptionEnum {
  NETWORK = 'network issue',
  ASSOCIATION_FAILURE = 'failed to associate theme w new user'
}

export class ThemeException extends Error {
  constructor(msg: ThemeExceptionEnum) {
    super(msg);
  }
}
