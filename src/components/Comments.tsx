import * as React from 'react';
import Comment from '../types/comment';
import './Comments.css';
import CommentItem from './CommentItem';
import { API_BASE_URL } from '../constants';

interface CommentsProps {
  commentIDs: Array<number>;
}

interface CommentsState {
  comments: Array<Comment>;
}

const randomColor = require('randomcolor');

export default class Comments extends React.Component<CommentsProps, CommentsState> {
  constructor(props: CommentsProps) {
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

  renderCommentItems(): any {
    const { comments } = this.state;
    const color = randomColor();

    return (
      <ul className="list-group">
        {comments.map((comment: Comment) => {
          if (comment.type === 'comment') {
            return (
              <li key={comment.id} className="list-group-item" style={{ borderLeftColor: color, borderLeftWidth: 'medium' }}>
                <CommentItem comment={comment} />
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
