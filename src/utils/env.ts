export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export const devApiTargets = {
  baseUrl: 'http://localhost:80/'
} as const;

export const prodApiTargets = {
  baseUrl: ''
} as const;
