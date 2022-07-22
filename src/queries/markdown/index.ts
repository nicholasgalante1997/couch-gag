import { useQuery } from 'react-query';
import { StoryKey } from '@nickgdev/couch-gag-common-lib';
import { getStories, getStoryByStoryKey } from '../../service';

export const useQueryAllMarkdownStories = () => {
  return useQuery('markdown', getStories);
};

export const useQuerySingleMarkdownStory = (storyKey: StoryKey) => {
  return useQuery(
    ['markdown', storyKey.seasonKey, storyKey.episodeKey], 
    () => getStoryByStoryKey(storyKey)
  );
};
