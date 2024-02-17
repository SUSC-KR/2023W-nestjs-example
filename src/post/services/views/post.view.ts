export interface PostView {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface PostListView {
  count: number;
  posts: PostView[];
}
