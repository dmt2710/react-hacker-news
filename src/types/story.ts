type StoryType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export interface Story {
  id: number;
  by: string;
  descendants: number;
  kids: Array<number>;
  score: number;
  time: number;
  title: string;
  type: StoryType;
  url: string;
}

export default Story;
