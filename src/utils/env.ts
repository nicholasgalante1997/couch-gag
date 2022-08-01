export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export const devApiTargets = {
  baseUrl: 'http://localhost:80/',
  metricHub: 'http://localhost:7878/metric'
} as const;

export const prodApiTargets = {
  baseUrl: '',
  metricHub: ''
} as const;
