export type CommentType = 'comment';

export interface Comment {
  by: string;
  id: number;
  kids?: Array<number>;
  parent: number;
  text: string;
  time: number;
  type: CommentType;
}

export default Comment;
