import { Theme, Treatment } from '@nickgdev/couch-gag-common-lib';
import { devApiTargets, isDev, prodApiTargets } from '../../utils';

export type ThemeResponseBody = {
  data: { themeOptions: Treatment<Theme>[] };
  error?: string;
};

type ThemeRequestBody = {
  uId?: string;
  cId?: string;
  cookie?: string;
  devEnvThemeOverride?: string | string[];
};

export async function getViewThemeTreatment(
  uId?: string,
  cId?: string,
  cookie?: string,
  themeSlice?: string | string[]
): Promise<ThemeResponseBody> {
  const base = isDev() ? devApiTargets.baseUrl : prodApiTargets.baseUrl;
  const url = base + 'theme';

  const data: ThemeRequestBody = {};
  if (uId) data.uId = uId;
  if (cId) data.cId = cId;
  if (cookie) data.cookie = cookie;
  if (themeSlice) data.devEnvThemeOverride = themeSlice;

  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-ulysses-key': process.env.NEXT_PUBLIC_ULYSSES_HASHED_KEY!
    },
    body: JSON.stringify(data)
  })
    .then((r: Response) => r.json())
    .catch((e: any) => console.error(e));
}
