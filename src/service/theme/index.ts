import { Theme, Treatment, User } from '@nickgdev/couch-gag-common-lib';
import { devApiTargets, isDev, prodApiTargets } from '../../utils';

type ThemeResponseBody = {
  data: { themeOptions: Treatment<Theme>[] };
  error?: string;
};

export async function getViewThemeTreatment(
  uId?: string,
  cId?: string
): Promise<ThemeResponseBody> {
  const base = isDev() ? devApiTargets.baseUrl : prodApiTargets.baseUrl;
  const url = base + 'theme';

  const data: { uId?: string; cId?: string } = {};
  if (uId) data.uId = uId;
  if (cId) data.cId = cId;

  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-ulysses-key': process.env.REACT_APP_ULYSSES_HASHED_KEY!
    },
    body: JSON.stringify(data)
  })
    .then((r: Response) => r.json())
    .catch((e: any) => console.error(e));
}
