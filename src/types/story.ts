export type Story = {
  meta: {
    readonly episodeKey: string;
    readonly seasonKey: string;
    genres: string[];
    img?: string;
    subtitle?: string;
    title: string;
    key: string;
  };
  readonly content: string;
};

export type StoryRowProps = {
  imgSrc: string;
  title: string;
  subtitle: string;
  genres: string[];
  episodeKey: string;
  seasonKey: string;
  index: number;
};
