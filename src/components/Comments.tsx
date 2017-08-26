import * as React from 'react';
import Comment from '../types/comment';
import * as moment from 'moment';
import './Comments.css';
import { API_BASE_URL } from '../constants';

interface CommentsProps {
  commentIDs: Array<number>;
}

interface CommentsState {
  comments: Array<Comment>;
}

export default class Comments extends React.Component<CommentsProps, CommentsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      comments: [],
    };
  }

  async componentDidMount() {
    const { commentIDs } = this.props;
    let comments: Array<Comment> = [];

    await this.fetchComments(commentIDs).then((rawComments: Array<Comment>) => comments = rawComments);

    this.setState({ comments });
  }

  async fetchComment(commentID: number) {
    const request = new Request(`${API_BASE_URL}/item/${commentID}.json`);
    const comment = await fetch(request).then(response => response.json());

    return comment;
  }

  fetchComments(commentIDs: Array<number>) {
    return Promise.all(commentIDs.map((commentID: number) => this.fetchComment(commentID)));
  }

  createMarkup(content: string) {
    return { __html: content };
  }

  renderCommentItems(): any {
    const { comments } = this.state;

    return (
      <ul className="list-group">
        {comments.map((comment: Comment) => {
          if (comment.type === 'comment') {
            return (
              <li key={comment.id} className="list-group-item">
                <p className="text-left" dangerouslySetInnerHTML={this.createMarkup(comment.text)} />
                <span className="text-left text-muted comment-position">
                  by <b>{comment.by}</b>&nbsp;
                {moment(parseInt(`${comment.time}000`, 10)).fromNow()}&nbsp;
              </span>
                <div className="clearfix" />
                <div>
                  {comment.kids ? <Comments commentIDs={comment.kids} /> : null}
                </div>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderCommentItems()}
      </div>
    );
  }
}
