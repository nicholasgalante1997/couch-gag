export function recursiveQueryParamConversion(
  source: any,
  arr: any[] | Set<any>
) {
  let safeSet: Set<any>;
  try {
    safeSet = new Set(arr);
  } catch (e) {
    console.error(
      '[<Story />] unable to construct Set from Array. High Level Error. Indicates that duplicate unique ids exist on stories.'
    );
    return { error: true };
  }

  safeSet.forEach((subset) => {
    if (Array.isArray(subset)) {
      recursiveQueryParamConversion(source, subset);
    } else {
      Object.assign(source, subset);
    }
  });

  return source;
}

export function parseUrlString(s: string) {
  return s
    .slice(1)
    .split('&')
    .map((kvStr) => ({ [kvStr.split('=')[0]]: kvStr.split('=')[1] }));
}
