/* eslint-disable no-loop-func */
export async function resiliantTryCatch<T>(
  callback: () => Promise<T> | T,
  tries = 3,
  timeout = 500,
  initialTryNumber = 0
) {
  let x = initialTryNumber;
  while (x < tries) {
    try {
      const res = await callback();
      return res;
    } catch (e) {
      console.error(
        'error with function call ' +
          callback.name +
          ' at ' +
          new Date().toISOString()
      );
      console.info('retrying ' + callback.name + ', attempt ' + x);
      x++;
      setTimeout(() => {
        resiliantTryCatch(callback, tries - 1, timeout + 500, x);
      }, timeout);
    }
  }
  return { isError: true };
}

export function reduceAndBool(...args: any[]) {
  let b = true;
  for (const arg of args) {
    if (!arg) b = false;
  }
  return b;
}
