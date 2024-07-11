import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gapSize, sizeOfIconsSmall, titleSize } from '@_constants/index';
import { createVideo } from '@_services/videosService';
import { validateStringNotEmpty, validateUrl } from '@_validators/index';
import { AppContextInterface, appContext } from '@_context/context';
import { Button } from '@_components/button';
import { TextArea, TextAreaDescription } from '@_components/input';
import { getVideoThumbnail } from '@_services/index';
import { ReturnIcon } from '@_assets/icons/return';
import { Text, Title } from '@_components/text';

// Styles
const BackgroundBlur = styled.div`
  background-color: ${colors.primaryOpacity};
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const UploadFormContainer = styled.div<{ show: boolean }>`
  position: absolute;
  display: grid;
  justify-content: center;
  grid-template-columns: 2fr 1fr;
  gap: ${gapSize}px;
  max-width: 50rem;
  left: 50%;
  transform: translate(-50%, 35vh);
  background-color: ${colors.primary};
  border: 1px solid ${colors.primaryBorder};
  padding: 20px;
  border-radius: ${borderRadius}px;
  box-shadow: 0 0 10px ${colors.primary};
  z-index: 1000;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  @media (max-width: 600px) {
    width: 23.5rem;
  }
`;

const VideoForm = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${gapSize}px;
`;

const ErrorText = styled.div`
  color: ${colors.red};
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${gapSize}px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const VideoText = styled.div`
  position: relative;
`;

const VideoImage = styled.img`
  width: 100%;
  border-radius: ${borderRadius}px;
  position: relative; 
  overflow: hidden;
  aspect-ratio: 4.5 / 3;
  
  @media (max-width: 600px) {
    aspect-ratio: unset;
  }
`;

const VideoInstruction = styled.div`
  margin-bottom: 1.5rem;
`;

interface UploadVideoFormProps {
  onClose: () => void;
}

export const UploadVideoForm: React.FC<UploadVideoFormProps> = ({ onClose }) => {
  const { accountUser, setIsNewVideoUploaded } = useContext(appContext) as AppContextInterface;

  const user_id = accountUser.user_id;
  const [video_url, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(undefined);
  const [canUpload, setCanUpload] = useState(false);
  const [loadingThumbnail, setLoadingThumbnail] = useState(false);

  useEffect(() => {
    setShowForm(true);
  }, []);

  useEffect(() => {
    const fetchThumbnail = async (url: string) => {
      if (validateUrl(url)) {
        setLoadingThumbnail(true);
        try {
          const thumbnail = await getVideoThumbnail(url);
          setTimeout(() => {
            setThumbnailUrl(thumbnail);
            setLoadingThumbnail(false);
          }, 1000);
        } catch (error) {
          console.error('Failed to fetch video thumbnail:', error);
          setThumbnailUrl(undefined);
          setLoadingThumbnail(false);
        }
      } else {
        setThumbnailUrl(undefined);
        setLoadingThumbnail(false);
      }
    };

    fetchThumbnail(video_url);
  }, [video_url]);

  useEffect(() => {
    // Enable upload button when both title and description are not empty and thumbnailUrl is valid
    setCanUpload(validateStringNotEmpty(title) && validateStringNotEmpty(description) && Boolean(thumbnailUrl));
  }, [title, description, thumbnailUrl]);

  /**
   * Handles form submission for uploading a new video.
   *
   * @param e - The form event object.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrl(video_url)) {
      setError('Invalid video URL.');
      return;
    }
    if (!validateStringNotEmpty(title)) {
      setError('Title must not be empty.');
      return;
    }
    if (!validateStringNotEmpty(description)) {
      setError('Description must not be empty.');
      return;
    }
    try {
      setIsNewVideoUploaded(true);
      await createVideo({ user_id, description, video_url, title });
      handleClose();
    } catch (error) {
      console.error('Failed to create video:', error);
    }
  };

  /**
   * Handles closing the form with animation.
   */
  const handleClose = () => {
    setShowForm(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  /**
   * Handles uploading the video.
   */
  const handleUpload = async () => {
    try {
      setIsNewVideoUploaded(true);
      await createVideo({ user_id, description, video_url, title });
      handleClose();
    } catch (error) {
      console.error('Failed to create video:', error);
    }
  };

  return (
    <>
      <BackgroundBlur />
      <UploadFormContainer show={showForm}>
        <Button onClick={handleClose}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: "0.2rem",
            right: "0.2rem",
            width: "1.5rem",
            height: "1.5rem",
            padding: 0,
          }}>
          <ReturnIcon width={`${sizeOfIconsSmall}px`} height={`${sizeOfIconsSmall}px`} />
        </Button>
        <VideoForm>
          <Form onSubmit={handleSubmit}>
            <TextArea
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', boxShadow: "none" }}
            />
            <TextAreaDescription
              id="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: "5px", borderRadius: "5px" }}
            />
            <TextArea
              id="video_url"
              placeholder="Video URL"
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setThumbnailUrl(undefined);
              }}
              style={{ width: '100%', minHeight: '2rem', maxHeight: '5rem', boxShadow: "none" }}
            />
            {error && <ErrorText>{error}</ErrorText>}
          </Form>
        </VideoForm>
        <VideoInstruction>
          <Title style={{ paddingLeft: "5%" }}>Preview</Title>
          {loadingThumbnail ? (
            <Text>Loading thumbnail...</Text>
          ) : (
            <>
              <VideoText>
                <VideoImage src={thumbnailUrl || "/Thumbnail_Not_Found.png"} alt="Video Thumbnail" />
              </VideoText>
              <Title>{title}</Title>
              <Text>{description.length > 40 ? `${description.substring(0, 40)}...` : description}</Text>
            </>
          )}
          <ButtonSection>
            {canUpload ? (
              <Button type="button" onClick={handleUpload}>Upload</Button>
            ) : (
              <Button type="button" disabled>Upload Video</Button>
            )}
          </ButtonSection>
        </VideoInstruction>
      </UploadFormContainer>
    </>
  );
};
