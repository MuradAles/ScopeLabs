const BASE_URL = 'https://cors-anywhere.herokuapp.com/take-home-assessment-423502.uc.r.appspot.com/api/videos';
//https://cors-anywhere.herokuapp.com added to pass cors

// This helps run Cors
//https://cors-anywhere.herokuapp.com/corsdemo

import { CreateVideoParams, EditVideoParams, CreateCommentParams } from '@_interfaces/index';

/**
 * Creates a new video.
 * 
 * @param user_id - The ID of the user creating the video.
 * @param description - The description of the video.
 * @param video_url - The URL of the video.
 * @param title - The title of the video.
 * 
 * @returns The newly created video.
 */
export const createVideo = async ({ user_id, description, video_url, title }: CreateVideoParams) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        description,
        video_url,
        title,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create video: ${response.statusText}`);
    }
    const newCreatedVideo = await response.json();
    console.log(newCreatedVideo);
    console.log('Video created successfully');
    return newCreatedVideo;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches videos of a specific user.
 * 
 * @param user_id - The ID of the user whose videos are to be fetched.
 * 
 * @returns A list of videos for the specified user.
 */
export const getUserVideos = async (user_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}?user_id=${user_id}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get videos: ${response.statusText}`);
    }
    const GetUserVideos = await response.json();
    console.log('Videos loaded successfully');
    return GetUserVideos.videos;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits an existing video.
 * 
 * @param video_id - The ID of the video to be edited.
 * @param title - The new title of the video.
 * @param description - The new description of the video.
 * 
 * @returns The edited video.
 */
export const editVideo = async ({ video_id, title, description }: EditVideoParams) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_id,
        title,
        description,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to change video: ${response.statusText}`);
    }
    const newEditVideo = await response.json();
    console.log('Video changed successfully');
    return newEditVideo;
  } catch (error) {
    console.log(error)
  }
};

/**
 * Fetches a single video by its ID.
 * 
 * @param video_id - The ID of the video to be fetched.
 * 
 * @returns The fetched video.
 */
export const getSingleVideo = async (video_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/single?video_id=${video_id}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get video: ${response.statusText}`);
    }
    const GetSingleVideo = await response.json();
    console.log('Video loaded successfully');
    return GetSingleVideo.video;
  } catch (error) {
    console.log(error)
  }
};

/**
 * Creates a new comment on a video.
 * 
 * @param video_id - The ID of the video to be commented on.
 * @param content - The content of the comment.
 * @param user_id - The ID of the user creating the comment.
 * 
 * @returns The newly created comment.
 */
export const createComment = async ({ video_id, content, user_id }: CreateCommentParams) => {
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_id,
        content,
        user_id,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create comment: ${response.statusText}`);
    }
    const NewComment = await response.json();
    console.log('Comment created successfully');
    return NewComment;
  } catch (error) {
    console.log(error)
  }
};

/**
 * Fetches comments for a specific video.
 * 
 * @param video_id - The ID of the video whose comments are to be fetched.
 * 
 * @returns A list of comments for the specified video.
 */
export const getVideoComments = async (video_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/comments?video_id=${video_id}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get Comments: ${response.statusText}`);
    }
    const GetVideoComments = await response.json();
    console.log('Comment loaded successfully');
    return GetVideoComments.comments;
  } catch (error) {
    console.log(error)
  }
};
