import * as React from 'react';
import Story from '../types/story';
import StoryListItem from '../components/StoryListItem';

interface HomeState {
  newStoryIds: Array<number>;
  stories: Array<Story>;
}

export default class Home extends React.Component<any, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      newStoryIds: [],
      stories: [],
    };
  }

  async fetchNewStoryIds() {
    const request = new Request('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const newStoryIds = await fetch(request).then(response => response.json()).then(json => json);

    return newStoryIds;
  }

  async fetchStory(storyId: number) {
    const request = new Request(` https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`);
    const story = await fetch(request).then(response => response.json());
    return story;
  }

  fetchStories(storyIds: Array<number>) {
    return Promise.all(storyIds.map((storyId: number) => this.fetchStory(storyId)));
  }

  async componentDidMount() {
    const newStoryIds = await this.fetchNewStoryIds();
    const first10StoryIds = newStoryIds.slice(0, 25);
    let stories: Array<Story> = [];

    await this.fetchStories(first10StoryIds).then((rawStories: Array<Story>) => stories = rawStories);

    this.setState({ newStoryIds, stories });
  }

  render() {
    const { stories } = this.state;
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">
            Stories
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {stories.map((story: Story) => {
                return (<li key={story.id} className="list-group-item"><StoryListItem story={story} /></li>);
              })}
            </ul>
          </div>
          <div className="panel-footer">
            Pagination goes here
          </div>
        </div>
      </div>
    );
  }
}
