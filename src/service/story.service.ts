import { Story } from '../types';
import { devApiTargets, prodApiTargets, isDev } from '../utils';

export async function getStoryByStoryKey(storyKey: {
  seasonKey: string;
  episodeKey: string;
}): Promise<Story> {
  const { seasonKey, episodeKey } = storyKey;
  const base = isDev() ? devApiTargets.baseUrl : prodApiTargets.baseUrl;
  const url = base + `markdown?seasonKey=${seasonKey}&episodeKey=${episodeKey}`;
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

export async function getStories(): Promise<{ collections: any }> {
  const base = isDev() ? devApiTargets.baseUrl : prodApiTargets.baseUrl;
  const url = base + 'all';
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
