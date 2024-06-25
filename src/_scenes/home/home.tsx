import { appContext, AppContextInterface } from '@_context/context';
import { Layout } from '@_components/layout';
import { Text, Title } from '@_components/index';
import { VideoDetails } from '@_scenes/videoDetails/videoDetails';
import { VideoParams } from '@_interfaces/index';
import { borderRadius } from '@_constants/styleConstants';
import { formatDateDistance } from '@_utilities/index';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

// Styles
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

export const Home = () => {
  const {
    videos,
    selectedVideoId,
    setSelectedVideoId,
    setSingleVideo,
  } = useContext(appContext) as AppContextInterface;

  const selectVideoDetails = (video: VideoParams) => {
    setSelectedVideoId(video.id);
  };

  useEffect(() => {
    if (!selectedVideoId) {
      setSingleVideo(null);
    }
  }, [selectedVideoId, setSingleVideo]);

  return (
    <Layout>
      <>
        <Videos>
          {videos.length > 0 ? (
            videos.map((video: VideoParams) => (
              <Video key={video.id} onClick={() => selectVideoDetails(video)}>
                {video.thumbnail_url ? (
                  <VideoImage src={video.thumbnail_url} alt={video.title} />
                ) : (
                  <VideoImage src="/Thumbnail_Not_Found.png" alt="Thumbnail Not Found" />
                )}
                <Title>{video.title}</Title>
                <Text>{formatDateDistance(video.created_at)}</Text>
                <Text>Comments: {video.num_comments}</Text>
              </Video>
            ))
          ) : (
            <Text>No videos found.</Text>
          )}
        </Videos>
      </>
      {selectedVideoId && <VideoDetails />}
    </Layout>
  );
};
