import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Layout } from '@_components/layout';

import { VideoParams } from '@_interfaces/index';

import { formatDateDistance } from '@_utilities/index'
import { borderRadius } from '@_constants/styleConstants';
import { VideoDetails } from '@_scenes/index';
import { appContext } from '@_context/context';

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
  const { videos } = useContext(appContext);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoParams | null>(null);

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
