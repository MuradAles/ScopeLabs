import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Layout } from '@_components/layout';

import { getUserVideos } from '@_services/index';
import { getVideoThumbnail } from '@_services/index';

import { VideoParams } from '@_interfaces/index';

import { formatDateDistance } from '@_utilities/index'
import { borderRadius } from '@_constants/styleConstants';
import { useUser } from '@_context/index';
import { VideoDetails } from '@_scenes/index';

const Videos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  text-decoration: none;
  color: inherit; 
  cursor: pointer;
`;

const VideoImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${borderRadius}px;
  position: relative; 
  overflow: hidden;
  &:before {
    display: block;
    padding-top: 75%;
  }
`;

const VideoTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 550;
`;

const VideoCreatedDate = styled.div``;

const Text = styled.div``;

export const Home = () => {
  const { username, videos, setVideos } = useUser();
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoParams | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getUserVideos(username);
        const videosWithThumbnails = await Promise.all(
          response.map(async (video: VideoParams) => {
            const thumbnailUrl = await getVideoThumbnail(video.video_url);
            return { ...video, thumbnail_url: thumbnailUrl };
          })
        );
        setVideos(videosWithThumbnails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [username, setVideos]);

  const openVideoDetails = (video: VideoParams) => {
    setSelectedVideo(video);
  };

  const closeVideoDetails = () => {
    setSelectedVideo(null);
  };

  return (
    <Layout>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Videos>
            {videos.length > 0 ? (
              videos.map((video: VideoParams) => (
                <Video key={video.id} onClick={() => openVideoDetails(video)}>
                  {video.thumbnail_url ? (
                    <VideoImage src={video.thumbnail_url} alt={video.title} />
                  ) : (
                    <VideoImage src="/Thumbnail_Not_Found.png" alt="Thumbnail Not Found" />
                  )}
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoCreatedDate>{formatDateDistance(video.created_at)}</VideoCreatedDate>
                </Video>
              ))
            ) : (
              <Text>No videos found.</Text>
            )}
          </Videos>
          {selectedVideo && (
            <VideoDetails video={selectedVideo} onClose={closeVideoDetails} />
          )}
        </>
      )}
    </Layout>
  );
};
