import { Theme } from '@nickgdev/couch-gag-common-lib';
import { devApiTargets, isDev, prodApiTargets } from '../../utils';

export async function getTreatment(stashedAssoc?: string): Promise<Theme> {
    const base = isDev() ? devApiTargets.baseUrl : prodApiTargets.baseUrl;
    const url = base + 'theme-treatment' + stashedAssoc ?? '';
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-ulysses-key': process.env.REACT_APP_ULYSSES_HASHED_KEY!
      }
    })
      .then((r: Response) => r.json())
      .catch((e: any) => console.error(e));
  }