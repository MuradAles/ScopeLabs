import { Button, Input, Text, Title, ErrorText } from '@_components/index';
import { AppContextInterface, appContext } from '@_context/context';
import { editVideo } from '@_services/videosService';
import { formatDateDistance } from '@_utilities/index';
import { colors, borderRadius } from '@_constants/styleConstants';
import CloseIcon from '@_assets/icons/close';
import FullScreenIcon from '@_assets/icons/fullScreen';
import PauseIcon from '@_assets/icons/pause';
import PlayIcon from '@_assets/icons/play';
import React, { useState, useRef, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { VideoComments } from './videoComments';
import { validateStringNotEmpty } from '@_validators/videoValidators';


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
  z-index: 999;
`;

const VideoError = styled.div`
  position: relative;
`;

const VideoErrorImage = styled.img`
  width: 100%;
  max-height: 600px;
  height: auto;
  border-radius: ${borderRadius}px;
  overflow: hidden;
`;

const VideoErrorText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
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
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none; 
  }
`;

const VideoPlayer = styled.div`
  position: relative;
  min-height: 400px;
  width: 100%;
  aspect-ratio: 16/9;
  margin: 5px auto;
`;

const Controls = styled.div<{ $visible: boolean }>`
  position: absolute;
  display: flex;
  background-color: ${colors.primarys0l50t40};
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 10px;
  width: 100%;
  bottom: 0;
  z-index: 1000;
  transition: opacity 1s;
  opacity: ${props => (props.$visible ? 1 : 0)};
`;

const SpeedControl = styled.div`
  position: relative;
  display: inline-block;

  select {
    padding: 8px;
    font-size: 1rem;
  }
`;

const Select = styled.select`
  background-color: ${colors.primary};
  border: none;
  color: white;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  width: fit-content;
`;

const VideoDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  background-color: ${colors.primarys0l15};
  border-radius: ${borderRadius}px;
`;

const TitleRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
`;

const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const ControlButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const VideoDetails: React.FC = () => {
  const {
    singleVideo,
    setSelectedVideoId,
    setIsVideoUpdated,
  } = useContext(appContext) as AppContextInterface;
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(singleVideo?.title || '');
  const [newDescription, setNewDescription] = useState(singleVideo?.description || '');
  const [error, setError] = useState('');
  const [, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  /**
   * Effect to update screenWidth state on window resize.
   */
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Effect to handle changes in fullscreen mode and update state accordingly.
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  /**
   * Effect to handle showing and hiding video controls based on mouse hover.
   */
  useEffect(() => {
    if (hovering) {
      setControlsVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    } else {
      timerRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hovering]);

  /**
   * Function to enter edit mode for the video details.
   */
  const handleEdit = () => {
    if (singleVideo) {
      setEditing(true);
      setNewTitle(singleVideo.title);
      setNewDescription(singleVideo.description);
    }
  };

  /**
   * Function to save changes made to the video details.
   */
  const handleSaveChanges = async () => {
    if (!singleVideo) {
      return;
    }
    if (!validateStringNotEmpty(newTitle)) {
      setError('Title must not be empty.');
      return;
    }
    if (!validateStringNotEmpty(newDescription)) {
      setError('Description must not be empty.');
      return;
    }
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
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current?.seekTo(seekTo);
    setCurrentTime(seekTo);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
        <Button onClick={handleClose}
          style={{
            position: "absolute",
            backgroundColor: "transparent",
            right: 0,
            top: 0,
            zIndex: 100
          }}>
          <CloseIcon width="15px" height="15px" />
        </Button>
        {ReactPlayer.canPlay(singleVideo.video_url) ? (
          <>
            <VideoPlayer
              ref={playerContainerRef}>
              <ReactPlayer
                ref={playerRef}
                url={singleVideo.video_url}
                playing={playing}
                volume={volume}
                playbackRate={playbackRate}
                controls={false}
                width="100%"
                height="100%"
                onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
                onDuration={(duration) => setDuration(duration)}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
              />
              <Controls $visible={controlsVisible}
                onMouseLeave={() => setHovering(false)}
                onMouseEnter={() => setHovering(true)}
                onTouchStart={() => setHovering(true)}
                onTouchEnd={() => setHovering(false)}
              >
                <ControlButton onClick={handlePlayPause}>
                  {playing ? <PauseIcon width={15} fill={colors.white} /> : <PlayIcon width={15} fill={colors.white} />}
                </ControlButton>
                <>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    style={{ width: '30vw' }}
                  />
                  {screenWidth > 600 && (
                    <Text style={{ color: colors.white }}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
                  )}
                </>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{ width: '10vw' }}
                />
                <SpeedControl>
                  <Select
                    id="speed-select"
                    value={playbackRate.toString()}
                    onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </Select>
                </SpeedControl>
                <ControlButton onClick={handleFullscreen}>
                  <FullScreenIcon width={20} fill={colors.white} />
                </ControlButton>
              </Controls>
            </VideoPlayer>
          </>
        ) : (
          <VideoError>
            <VideoErrorImage src="/Thumbnail_Not_Found.png" alt="Thumbnail Not Found" />
            <VideoErrorText>Video URL is not playable</VideoErrorText>
          </VideoError>
        )}
        <VideoDescription>
          {editing ? (
            <>
              <Input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ marginBottom: "6px", fontWeight: 700, fontSize: "1.1rem" }}
              />
              <DescriptionRow>
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <Button onClick={handleSaveChanges}>Save</Button>
              </DescriptionRow>
              {error && <ErrorText>{error}</ErrorText>}
            </>
          ) : (
            <>
              <TitleRow>
                <Title style={{ display: "flex", maxHeight: "none" }}>{singleVideo.title}</Title>
                <Text>{formatDateDistance(singleVideo.created_at)}</Text>
              </TitleRow>
              <DescriptionRow>
                <Text>{singleVideo.description}</Text>
                <Button style={{ height: "2rem" }} onClick={handleEdit}>Edit</Button>
              </DescriptionRow>
            </>
          )}
        </VideoDescription>
        <Text style={{ color: colors.white, width: "100%", margin: "10px 0" }}>
          {singleVideo.num_comments} comments
        </Text>
        <VideoComments />
      </VideoDetailsContent>
    </VideoScreen>
  );
};
