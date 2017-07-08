import * as React from 'react';
import Story from '../types/story';

interface StoryListItemProps {
  story: Story;
}

export default class StoryListItem extends React.Component<StoryListItemProps, {}> {
  render() {
    const { story } = this.props;

    return (
      <div>
        <a href={story.url} target="_blank">{story.title}</a>
      </div>
    );
  }
}
