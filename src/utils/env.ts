export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function getMdServerDevApiEndpoint() {
  const isDev = process.env.NODE_ENV === 'development';
  const rWD = typeof process.env.DOCKER_API_ENDPOINT !== 'undefined';
  if (rWD && isDev) {
    return devApiTargets.dockerProxy;
  } else if (isDev) {
    return devApiTargets.mdServer;
  } else {
    return process.env.PRODUCTION_API_ENDPOINT;
  }
}

export const devApiTargets = {
  dockerProxy: 'http://localhost:80/',
  mdServer: 'http://localhost:2023/',
  metricHub: 'http://localhost:7878/metric'
} as const;

export const prodApiTargets = {
  baseUrl: '',
  metricHub: ''
} as const;
