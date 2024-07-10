import { appContext, AppContextInterface } from '@_context/context';
import { Layout } from '@_components/layout';
import { Text, Title } from '@_components/index';
import { VideoDetails } from '@_scenes/videoDetails/videoDetails';
import { VideoParams } from '@_interfaces/index';
import { borderRadius, colors } from '@_constants/styleConstants';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

// Styles
const Videos = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media (max-width: 1200px){
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 600px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${borderRadius}px;
  background-color: ${colors.primaryLight};
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0 2px ${colors.orange};
  }
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

  /**
   * Function to handle selecting a video and setting its ID as the selectedVideoId.
   * 
   * @param video - The video object to be selected.
   */
  const selectVideoDetails = (video: VideoParams) => {
    setSelectedVideoId(video.id);
  };

  /**
   * Effect to reset the single video details when selectedVideoId changes.
   */
  useEffect(() => {
    if (!selectedVideoId) {
      setSingleVideo(null);
    }
  }, [selectedVideoId, setSingleVideo]);

  return (
    <Layout>
      <Videos>
        {videos.length > 0 ? (
          videos.map((video: VideoParams) => (
            <Video key={video.id} onClick={() => selectVideoDetails(video)}>
              {video.thumbnail_url ? (
                <VideoImage src={video.thumbnail_url} alt={video.title} />
              ) : (
                <VideoImage src="/Thumbnail_Not_Found.png" alt="Thumbnail Not Found" />
              )}
              <Title style={{ textAlign: "center" }}>{video.title}</Title>
            </Video>
          ))
        ) : (
          <Text>No videos found.</Text>
        )}
      </Videos>
      {selectedVideoId && <VideoDetails />}
    </Layout>
  );
};
