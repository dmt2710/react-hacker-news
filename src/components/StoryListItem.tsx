import Story from '../types/story';
import Comment from '../types/comment';
import * as React from 'react';
import * as moment from 'moment';
import './StoryListItem.css';
import ParentComments from './ParentComments';
import { extractHostName } from '../utilities/helpers';
import { STORY } from '../constants';

interface StoryListItemProps {
  story: Story;
}

interface StoryListState {
  comments: Array<Comment>;
}

const pluralize = require('pluralize');

export default class StoryListItem extends React.Component<StoryListItemProps, StoryListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      comments: [],
    };
  }

  handleViewComments = (event: any) => {
    return (
      <ParentComments comments={this.state.comments} />
    );
  }

  renderUrlSource(): any {
    const { story } = this.props;

    if (story.type !== STORY || !story.url) {
      return null;
    }

    return (<span className="text-muted">&nbsp;({extractHostName(story.url)})</span>);
  }

  renderCommentCounts(): any {
    const { story } = this.props;

    if (!story.kids) {
      return (
        <a className="text-muted" href={`https://news.ycombinator.com/item?id=${story.id}`} target="_blank">Discuss</a>
      );
    }

    return (
      <a onClick={this.handleViewComments}>
        {pluralize('comments', story.kids.length, true)}
      </a>
    );
  }

  renderInfos(): any {
    const { story } = this.props;

    return (
      <div>
        <p className="item-inline text-muted">{pluralize('point', story.score, true)}&nbsp;</p>
        <p className="item-inline text-muted">by <b>{story.by}</b>&nbsp;</p>
        <p className="item-inline text-muted">{moment(parseInt(`${story.time}000`, 10)).fromNow()}&nbsp;</p>
        <p className="item-inline text-muted">|&nbsp;</p>
        {this.renderCommentCounts()}
      </div>
    );
  }

  render() {
    const { story } = this.props;

    return (
      <div>
        <div>
          <a href={story.url} target="_blank">{story.title}</a>
          {this.renderUrlSource()}
        </div>
        <div>
          {this.renderInfos()}
        </div>
        <div className="collapse" id={`comments-${story.id}`}>
          <div className="well">
          </div>
        </div>
        <div className="clearfix"/>
      </div>
    );
  }
}
