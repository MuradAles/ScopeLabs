export const getVideoThumbnail = async (videoUrl: string): Promise<string | undefined> => {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } else {
    return undefined;
  }
};

export const extractYouTubeVideoId = (videoUrl: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=)([^#&?]*).*/;
  const match = videoUrl.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};