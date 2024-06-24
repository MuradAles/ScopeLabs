import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { appContext } from '@_context/context';
import { formatDateDistance } from '@_utilities/index';
import { colors, borderRadius } from '@_constants/styleConstants';
import { VideoComments } from './videoComments';
import CloseIcon from '@_assets/icons/close';
import { editVideo } from '@_services/videosService';

const VideoScreen = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const VideoError = styled.div`
  position:relative;
`;

const VideoErrorImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${borderRadius}px;
  overflow: hidden;
`;

const VideoErrorText = styled.div`
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 1.5rem;
  padding: 5px;
  background-color: ${colors.primarys0l15};
  border-radius: ${borderRadius}px;
  display: flex;
`;

const VideoDetailsContent = styled.div`
  position: absolute;
  top: 40px;
  bottom: 100px;
  background-color: ${colors.primary};
  padding: 20px;
  border-radius: ${borderRadius}px;
  width: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoPlayer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 0;
  padding-top: 75%;
  margin: 5px auto;
  
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  bottom: calc(0% + 20px);
`;

const Button = styled.button`
  background-color: ${colors.primarys0l15};
  border: none;
  color: white;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primarys0l25};
  }
`;

const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 1000;
  right: 5px;
  top: 5px;
`;

const VideoDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding:10px;
  width:100%; 
  background-color: ${colors.primarys0l15};
  border-radius: ${borderRadius}px;
`;

const TitleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const Text = styled.span`
  width: 100%;
`;

const EditableTitle = styled.input`
  font-size: 1.2rem;
  font-weight: 550;
  margin-bottom: 6px;
  color: ${colors.white};
  background-color: ${colors.primary};
  border: 1px solid ${colors.primary};
  width: 50%;
  resize: horizontal;
`;

const EditableText = styled.textarea`
  resize: vertical;
  padding: 5px;
  font-size: 1rem;
  color: ${colors.white};
  background-color: ${colors.primary};
  border: 1px solid ${colors.primary};
`;

const EditButton = styled.button`
  position: absolute;
  right: 20px;
`;

export const VideoDetails: React.FC = () => {
  const {
    singleVideo,
    setSelectedVideoId,
    setIsVideoUpdated,
  } = useContext(appContext);
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(singleVideo?.title || '');
  const [newDescription, setNewDescription] = useState(singleVideo?.description || '');

  const handleEdit = () => {
    setEditing(true);
    setNewTitle(singleVideo.title);
    setNewDescription(singleVideo.description);
  };

  const handleSaveChanges = async () => {
    try {
      if (newTitle !== singleVideo?.title || newDescription !== singleVideo?.description) {
        await editVideo({
          video_id: singleVideo.id,
          title: newTitle,
          description: newDescription,
        });
        setIsVideoUpdated(true);
      }
      setEditing(false);
    } catch (error) {
      console.error('Failed to update video:', error);
    }
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const handleFullscreen = () => {
    const player = playerRef.current;
    if (player) {
      const playerElement = player.getInternalPlayer();
      if (playerElement) {
        if (playerElement.requestFullscreen) {
          playerElement.requestFullscreen();
        } else if (playerElement.webkitRequestFullscreen) { /* Safari */
          playerElement.webkitRequestFullscreen();
        } else if (playerElement.msRequestFullscreen) { /* IE11 */
          playerElement.msRequestFullscreen();
        }
      }
    }
  };

  const handleClose = () => {
    setSelectedVideoId(null);
  };

  if (!singleVideo) {
    return null;
  }

  return (
    <VideoScreen>
      <VideoDetailsContent>
        <CloseButton onClick={handleClose}><CloseIcon width="15px" height="15px" /></CloseButton>
        {ReactPlayer.canPlay(singleVideo.video_url) ? (
          <VideoPlayer ref={playerContainerRef}>
            <ReactPlayer
              ref={playerRef}
              url={singleVideo.video_url}
              playing={playing}
              volume={volume}
              playbackRate={playbackRate}
              controls={false}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <Controls>
              <Button onClick={handlePlayPause}>
                {playing ? 'Pause' : 'Play'}
              </Button>
              <Button onClick={() => handlePlaybackRateChange(0.5)}>0.5x</Button>
              <Button onClick={() => handlePlaybackRateChange(1)}>1x</Button>
              <Button onClick={() => handlePlaybackRateChange(1.5)}>1.5x</Button>
              <Button onClick={() => handlePlaybackRateChange(2)}>2x</Button>
              <Button onClick={handleFullscreen}>Fullscreen</Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                style={{ width: '100px' }}
              />
            </Controls>
          </VideoPlayer>
        ) : (
          <VideoError>
            <VideoErrorImage src="/Thumbnail_Not_Found.png" alt="Thumbnail Not Found" />
            <VideoErrorText>Video URL is not playable.</VideoErrorText>
          </VideoError>
        )}

        <VideoDescription>
          {editing ? (
            <>
              <EditableTitle
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <EditableText
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <EditButton onClick={handleSaveChanges}>Save</EditButton>
            </>
          ) : (
            <>
              <TitleRow>
                <Title>{singleVideo.title}</Title>
                <Text>{formatDateDistance(singleVideo.created_at)}</Text>
              </TitleRow>
              <Text>{singleVideo.description}</Text>
              <EditButton onClick={handleEdit}>Edit</EditButton>
            </>
          )}
        </VideoDescription>
        <Text>
          {singleVideo.num_comments} : comments
        </Text>
        <VideoComments />
      </VideoDetailsContent>
    </VideoScreen>
  );
};
