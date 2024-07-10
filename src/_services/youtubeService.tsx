/**
 * Generates a YouTube video thumbnail URL from a given video URL.
 * 
 * @param videoUrl - The URL of the YouTube video.
 * 
 * @returns The URL of the video's thumbnail if the video ID is extracted successfully, otherwise undefined.
 */
export const getVideoThumbnail = async (videoUrl: string): Promise<string | undefined> => {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } else {
    return undefined;
  }
};

/**
 * Extracts the YouTube video ID from a given video URL.
 * 
 * @param videoUrl - The URL of the YouTube video.
 * 
 * @returns The video ID if extracted successfully, otherwise null.
 */
export const extractYouTubeVideoId = (videoUrl: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=)([^#&?]*).*/;
  const match = videoUrl.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};