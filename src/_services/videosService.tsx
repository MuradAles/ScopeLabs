const BASE_URL = 'https://cors-anywhere.herokuapp.com/take-home-assessment-423502.uc.r.appspot.com/api/videos';
//https://cors-anywhere.herokuapp.com added to pass cors

// This helps run Cors
//https://cors-anywhere.herokuapp.com/corsdemo

import { CreateVideoParams, EditVideoParams, CreateCommentParams } from '@_interfaces/index';

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
    console.log(newEditVideo);
    console.log('Video changed successfully');
    return newEditVideo;
  } catch (error) {
    console.log(error)
  }
};

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
    console.log(GetSingleVideo);
    console.log('Video loaded successfully');
    return GetSingleVideo;
  } catch (error) {
    console.log(error)
  }
};

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
    console.log(NewComment);
    console.log('Comment created successfully');
    return NewComment;
  } catch (error) {
    console.log(error)
  }
};

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
    console.log(GetVideoComments);
    console.log('Comment loaded successfully');
    return GetVideoComments;
  } catch (error) {
    console.log(error)
  }
};
