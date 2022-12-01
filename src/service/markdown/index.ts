import { Story, StoryCollection } from '../../types';
import { getMdServerDevApiEndpoint } from '../../utils';

export async function getStoryByStoryKey(storyKey: {
  seasonKey: string;
  episodeKey: string;
}): Promise<Story> {
  const { seasonKey, episodeKey } = storyKey;
  const base = getMdServerDevApiEndpoint();
  const url = base + `markdown?seasonKey=${seasonKey}&episodeKey=${episodeKey}`;
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-ulysses-key': process.env.NEXT_PUBLIC_ULYSSES_HASHED_KEY!
    }
  })
    .then((r: Response) => r.json())
    .catch((e: any) => console.error(e));
}

export async function getStories(): Promise<StoryCollection> {
  const base = getMdServerDevApiEndpoint();
  const url = base + 'all';
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-ulysses-key': process.env.NEXT_PUBLIC_ULYSSES_HASHED_KEY!
    }
  })
    .then((r: Response) => r.json())
    .catch((e: any) => console.error(e)); // better error handling
}
