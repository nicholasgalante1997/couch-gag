export enum AnthExceptionEnum {
  NETWORK = 'network issue',
  EMPTY_COLLECTION = 'ANTH collection was returned with no members',
  ULYSSES_VERIFICATION = 'ulysses key verification failed'
}

export class AnthException extends Error {
  constructor(msg: AnthExceptionEnum) {
    super(msg);
  }
}
