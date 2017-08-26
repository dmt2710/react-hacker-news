import Story from '../types/story';
import * as React from 'react';
import * as moment from 'moment';
import './StoryListItem.css';
import Comments from './Comments';
import { extractHostName } from '../utilities/helpers';
import { STORY } from '../constants';
import { CommonEvent } from '../types/event';

interface StoryListItemProps {
  story: Story;
}

interface StoryListState {
  isCommentOpened: boolean;
}

const pluralize = require('pluralize');
const Collapse = require('react-collapse');

export default class StoryListItem extends React.Component<StoryListItemProps, StoryListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isCommentOpened: false,
    };
  }

  handleOpenComments = (event: CommonEvent) => {
    this.setState({
      isCommentOpened: !this.state.isCommentOpened,
    });
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
      <a onClick={this.handleOpenComments}>
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
    const { isCommentOpened } = this.state;

    return (
      <div>
        <div>
          <a href={story.url} target="_blank">{story.title}</a>
          {this.renderUrlSource()}
        </div>
        <div>
          {this.renderInfos()}
        </div>
        <Collapse isOpened={isCommentOpened} hasNestedCollapse={true}>
          <div className="panel panel-default">
            <div className="panel-heading" onClick={this.handleOpenComments}>Comments</div>
            <div className="panel-body">
              <Comments commentIDs={story.kids} />
            </div>
          </div>
        </Collapse>
        <div className="clearfix"/>
      </div>
    );
  }
}
