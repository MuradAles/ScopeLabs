export interface User {
  user_id: string;
}

export interface CreateVideoParams {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
}

export interface EditVideoParams {
  video_id: string;
  title: string;
  description: string;
}

export interface CreateCommentParams {
  video_id: string;
  content: string;
  user_id: string;
}

export interface VideoParams {
  created_at: string;
  description: string;
  id: string;
  num_comments: number;
  title: string;
  user_id: string;
  video_url: string;
  thumbnail_url?: string;
}

export interface CommentParams {
  content: string;
  created_at: string;
  id: string;
  user_id: string;
  video_id: string;
}