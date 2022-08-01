export function formatQueryParams(
  url: string,
  queryParams: { [k: string]: string }
) {
  url += '?';
  for (const [key, value] of Object.entries(queryParams)) {
    url += key + '=' + value;
    if (
      Object.keys(queryParams).indexOf(key) !=
      Object.keys(queryParams).length - 1
    ) {
      url += '&';
    }
  }
  return url;
}
