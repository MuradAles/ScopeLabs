import { Button, InputVideo, Text, Title, ErrorText } from '@_components/index';
import { AppContextInterface, appContext } from '@_context/context';
import { editVideo } from '@_services/videosService';
import { formatDateDistance } from '@_utilities/index';
import { colors, borderRadius } from '@_constants/styleConstants';
import { ReturnIcon } from '@_assets/icons/return';
import FullScreenIcon from '@_assets/icons/fullScreen';
import PauseIcon from '@_assets/icons/pause';
import PlayIcon from '@_assets/icons/play';
import React, { useState, useRef, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { VideoComments } from './videoComments';
import { validateStringNotEmpty } from '@_validators/videoValidators';
import { SpeedIcon } from '@_assets/icons/speedIcon';
import { VolumeOff } from '@_assets/icons/volumeOff';
import { VolumeOn } from '@_assets/icons/volumeOn';


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
  min-height: 500px;
  width: 100%;
  aspect-ratio: 16/9;
  margin: 5px auto;
  
  @media (max-width: 600px) {
   min-height: 300px;
  }
`;

const Controls = styled.div<{ $visible: boolean }>`
  position: absolute;
  display: grid;
  grid-template-rows: 1fr 2fr;
  background-color: #0000008a;
  width: 100%;
  padding: 0 1rem;
  bottom: 0;
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

const SeekBarRow = styled.div`
  width: 100%;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SeekBar = styled.input<{ value: number, max: number, isHovered: boolean }>`
  opacity: 0.7;
  width: 100%;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    #ff0000 ${(props) => (props.value / props.max) * 100}%,
    #d1d1d1 ${(props) => (props.value / props.max) * 100}%
  );
  cursor: pointer;
  border-radius: 1px;
  height: 5px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: ${(props) => (props.isHovered ? '15px' : '0')};
    height: ${(props) => (props.isHovered ? '15px' : '0')};
    background: #ff0000;
    border-radius: 50%;
    transition: width 0.3s, height 0.3s;
  }
`;

const VolumeBar = styled.input<{ value: number, max: number }>`
  opacity: 1;
  width: 35%;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    #ffffff ${(props) => (props.value / props.max) * 100}%,
    #8d8d8d ${(props) => (props.value / props.max) * 100}%
  );
  cursor: pointer;
  border-radius: 1px;
  height: 5px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: ${(props) => (props ? '15px' : '0')};
    height: ${(props) => (props ? '15px' : '0')};
    background: #ffffff;
    border-radius: 50%;
    transition: width 0.3s, height 0.3s;
  }
`;

const SpeedOptions = styled.div`
  position: absolute;
  bottom: calc(100% + 5px);
  right: -10px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary};
  border-radius: ${borderRadius}px;
  padding: 5px;
`;

const SpeedOption = styled.div`
  padding: 5px;
  cursor: pointer;
  color: ${colors.white};

  &:hover {
    background-color: ${colors.primarys0l15};
  }
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
  const [mute, setMute] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(singleVideo?.title || '');
  const [newDescription, setNewDescription] = useState(singleVideo?.description || '');
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [isSeekBarHovered, setIsSeekBarHovered] = useState(false);


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


  const handleClose = () => {
    setSelectedVideoId(null);
  };

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

  /**
   * Video Controls Functions
   */
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMute(newVolume === 0);
  };

  const handleToggleMute = () => {
    if (volume === 0) {
      setVolume(0.5);
      setMute(false);
    } else {
      setVolume(0);
      setMute(true);
    }
  };

  const handleSpeedOptionClick = (speed: number) => {
    setPlaybackRate(speed);
    setShowSpeedOptions(false);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  /**
   * Handle Seek Control
   */
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current?.seekTo(seekTo);
    setCurrentTime(seekTo);
  };

  const handleSeekBarMouseEnter = () => {
    setIsSeekBarHovered(true);
  };

  const handleSeekBarMouseLeave = () => {
    setIsSeekBarHovered(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!singleVideo) {
    return null;
  }

  return (
    <VideoScreen>
      <Button onClick={handleClose}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: "2.5rem",
          left: "0.5rem",
        }}>
        <ReturnIcon width="30px" height="30px" />
      </Button>
      <VideoDetailsContent>
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
              onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
              onDuration={(duration) => setDuration(duration)}
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
            />
            <Controls
              $visible={controlsVisible}
              onMouseLeave={() => setHovering(false)}
              onMouseEnter={() => setHovering(true)}
              onTouchStart={() => setHovering(true)}
              onTouchEnd={() => setHovering(false)}
            >
              <SeekBarRow>
                <SeekBar
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  isHovered={isSeekBarHovered}
                  onMouseEnter={handleSeekBarMouseEnter}
                  onMouseLeave={handleSeekBarMouseLeave}
                />
              </SeekBarRow>
              <ControlRow>
                <LeftControls>
                  <ControlButton onClick={handlePlayPause}>
                    {playing ? <PauseIcon width={15} fill={colors.white} /> : <PlayIcon width={15} fill={colors.white} />}
                  </ControlButton>
                  {mute ? (
                    <VolumeOff width={25} fill={colors.white} onClick={handleToggleMute} />
                  ) : (
                    <VolumeOn width={25} fill={colors.white} onClick={handleToggleMute} />
                  )}
                  <VolumeBar
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <Text style={{ color: colors.white }}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
                </LeftControls>
                <RightControls>
                  <SpeedControl>
                    <ControlButton onClick={() => setShowSpeedOptions(!showSpeedOptions)}>
                      <SpeedIcon width={25} fill={colors.white} />
                    </ControlButton>
                    {showSpeedOptions && (
                      <SpeedOptions>
                        <SpeedOption onClick={() => handleSpeedOptionClick(0.5)}>0.5x</SpeedOption>
                        <SpeedOption onClick={() => handleSpeedOptionClick(0.75)}>0.75x</SpeedOption>
                        <SpeedOption onClick={() => handleSpeedOptionClick(1)}>1x</SpeedOption>
                        <SpeedOption onClick={() => handleSpeedOptionClick(1.5)}>1.5x</SpeedOption>
                        <SpeedOption onClick={() => handleSpeedOptionClick(2)}>2x</SpeedOption>
                      </SpeedOptions>
                    )}
                  </SpeedControl>
                  <ControlButton onClick={handleFullscreen}>
                    <FullScreenIcon width={20} fill={colors.white} />
                  </ControlButton>
                </RightControls>
              </ControlRow>
            </Controls>
          </VideoPlayer>
        ) : (
          <VideoError>
            <VideoErrorImage src="/Thumbnail_Not_Found.png" alt="Thumbnail Not Found" />
            <VideoErrorText>Video URL is not playable</VideoErrorText>
          </VideoError>
        )}
        <VideoDescription>
          {editing ? (
            <>
              <InputVideo
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ marginBottom: "6px", fontWeight: 700, fontSize: "1.1rem" }}
              />
              <DescriptionRow>
                <InputVideo
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
