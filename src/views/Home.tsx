import * as React from 'react';
import StoryListItem from '../components/StoryListItem';
import Loader from '../components/Loader';
import { PER_PAGE, API_BASE_URL } from '../constants';
import Story from '../types/story';
import ButtonEvent from '../types/event';

interface HomeState {
  newStoryIds: Array<number>;
  stories: Array<Story>;
  currentPage: number;
  currentStartIndex: number;
  currentEndIndex: number;
  isLastPage: boolean;
  isLoading: boolean;
}

export default class Home extends React.Component<any, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      newStoryIds: [],
      stories: [],
      currentPage: 1,
      currentStartIndex: 0,
      currentEndIndex: PER_PAGE,
      isLastPage: false,
      isLoading: true,
    };
  }

  async fetchNewStoryIds() {
    const request = new Request(`${API_BASE_URL}/newstories.json?print=pretty`);
    const newStoryIds = await fetch(request).then(response => response.json()).then(json => json);

    return newStoryIds;
  }

  async fetchStory(storyId: number) {
    const request = new Request(`${API_BASE_URL}/item/${storyId}.json?print=pretty`);
    const story = await fetch(request).then(response => response.json());
    return story;
  }

  fetchStories(storyIds: Array<number>) {
    return Promise.all(storyIds.map((storyId: number) => this.fetchStory(storyId)));
  }

  async componentDidMount() {
    const { currentStartIndex, currentEndIndex } = this.state;
    const newStoryIds = await this.fetchNewStoryIds();
    const firstStoryIds = newStoryIds.slice(currentStartIndex, currentEndIndex);
    let stories: Array<Story> = [];

    await this.fetchStories(firstStoryIds).then((rawStories: Array<Story>) => stories = rawStories);

    this.setState({ newStoryIds, stories, isLoading: false });
  }

  handlePaginate = (event: ButtonEvent) => {
    const direction = event.target.dataset.direction;

    this.setState({ isLoading: true });

    if (direction === 'next') {
      this.setState((prevState: HomeState) => {
        return { currentPage: prevState.currentPage + 1,
                 currentStartIndex: prevState.currentStartIndex + PER_PAGE,
                 currentEndIndex: prevState.currentEndIndex + PER_PAGE,
        };
      }, this.refreshNewStories);
    }

    if (direction === 'previous') {
      this.setState((prevState: HomeState) => {
        return { currentPage: prevState.currentPage - 1,
                 currentStartIndex: prevState.currentStartIndex - (PER_PAGE),
                 currentEndIndex: prevState.currentStartIndex,
        };
      }, this.refreshNewStories);
    }
  }

  refreshNewStories = async () => {
    let stories: Array<Story> = [];
    const { currentStartIndex, currentEndIndex, newStoryIds } = this.state;
    const storyIds = newStoryIds.slice(currentStartIndex, currentEndIndex);

    await this.fetchStories(storyIds).then((rawStories: Array<Story>) => stories = rawStories);

    this.setState({ stories, isLoading: false });
  }

  renderResultPage() {
    const { stories } = this.state;

    return (
      <ul className="list-group">
        {stories.map((story: Story) => {
          return (<li key={story.id} className="list-group-item"><StoryListItem story={story} /></li>);
        })}
      </ul>
    );
  }

  render() {
    const { currentPage, isLastPage, isLoading } = this.state;

    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">
            Stories
          </div>
          <div className="panel-body">
            {isLoading ? <Loader /> : this.renderResultPage()}
          </div>
          <div className="panel-footer">
            <button
              data-direction="previous"
              className="btn btn-primary"
              disabled={currentPage === 1 || isLoading}
              onClick={this.handlePaginate}
            >
              Previous
            </button>
            &nbsp;
            <a
              data-direction="next"
              className="btn btn-primary"
              disabled={isLastPage || isLoading}
              onClick={this.handlePaginate}
            >
              Next
            </a>
            <br />
            Current Page: {currentPage}
          </div>
        </div>
      </div>
    );
  }
}
