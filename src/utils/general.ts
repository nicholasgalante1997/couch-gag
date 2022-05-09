/* eslint-disable no-loop-func */
export async function resiliantTryCatch(
  callback: () => void | Promise<any> | any,
  tries: number = 3,
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
