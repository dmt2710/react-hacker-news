import * as React from 'react';
import Comment from '../types/comment';

interface ParentCommentsProps {
  comments: Array<Comment>;
}

export default class ParentComments extends React.Component<ParentCommentsProps, {}> {
}
