import * as React from 'react';
import Comment from '../types/comment';
import * as moment from 'moment';
import Comments from './Comments';

interface CommentProps {
  comment: Comment;
}

interface CommentState {
  toggledChildComments: boolean;
}

export default class CommentItem extends React.Component<CommentProps, CommentState> {
  constructor(props: CommentProps) {
    super(props);

    this.state = {
      toggledChildComments: false,
    };
  }

  handleToggleChildComments = () => {
    this.setState({
      toggledChildComments: !this.state.toggledChildComments
    });
  }

  renderToggleChildCommentsIcon() {
    return (
      this.state.toggledChildComments ? <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true" /> :
                                        <span className="glyphicon glyphicon-triangle-right" aria-hidden="true" />
    );
  }

  createMarkup(content: string) {
    return { __html: content };
  }

  render() {
    const { comment } = this.props;

    return (
      <div>
        <p className="text-left" dangerouslySetInnerHTML={this.createMarkup(comment.text)} />
        <span className="text-left text-muted comment-position">
          by <b>{comment.by}</b>&nbsp;
          {moment(parseInt(`${comment.time}000`, 10)).fromNow()}&nbsp;
          {comment.kids && (
            <a 
              role="button" 
              data-toggle="collapse" 
              href={`#comments-of-${comment.id}`} 
              aria-expanded="false"
              aria-controls={`comments-of-${comment.id}`}
              onClick={this.handleToggleChildComments}
            >
              {this.renderToggleChildCommentsIcon()}
            </a>
          )}
        </span>
        <div className="clearfix" />
        <div className="collapse" id={`comments-of-${comment.id}`}>
          {comment.kids ? <Comments commentIDs={comment.kids} /> : null}
        </div>
      </div>
    );
  }
}
