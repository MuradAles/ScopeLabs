import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gapSize, textSize, titleSize } from '@_constants/index';

import { createVideo } from '@_services/videosService';
import { validateStringNotEmpty, validateUrl } from '@_validators/index';
import { AppContextInterface, appContext } from '@_context/context';
import { Button } from '@_components/button';
import { TextArea } from '@_components/input';
import { getVideoThumbnail } from '@_services/index';

// Styles
const UploadFormContainer = styled.div<{ show: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 85vw;
  right: 10%;
  background-color: ${colors.primaryLight};
  padding: 10px;
  border-radius: ${borderRadius}px;
  box-shadow: 0 0 10px ${colors.primary};
  z-index: 1000;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  @media (max-width: 600px) {
    width: 23.5rem;
  }
`;

const Header = styled.form`
  display: flex;
  justify-content: center;
  margin: 0 5px 5px 5px;
  font-size: ${titleSize};
  font-weight: 550;
`;

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
  justify-content: end;
  gap: ${gapSize}px;
`;

const VideoText = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const VideoImage = styled.img`
  width: 50%;
  border-radius: ${borderRadius}px;
  position: relative; 
  overflow: hidden;
  aspect-ratio: 4.5 / 3;
  
  @media (max-width: 600px) {
    aspect-ratio: unset;
  }
`;

const VideoErrorText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${textSize};
  padding: 5px;
  background-color: ${colors.primaryLight};
  border-radius: ${borderRadius}px;
  display: flex;
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
  const [canUpload, setCanUpload] = useState(false); // State to track if upload button should be enabled

  useEffect(() => {
    setShowForm(true);
  }, []);

  useEffect(() => {
    const fetchThumbnail = async (url: string) => {
      if (validateUrl(url)) {
        try {
          const thumbnail = await getVideoThumbnail(url);
          setThumbnailUrl(thumbnail);
        } catch (error) {
          console.error('Failed to fetch video thumbnail:', error);
          setThumbnailUrl(undefined);
        }
      } else {
        setThumbnailUrl(undefined);
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
    <UploadFormContainer show={showForm}>
      <Header>Upload Video</Header>
      <Form onSubmit={handleSubmit}>
        <TextArea
          id="video_url"
          placeholder="Video URL"
          onChange={(e) => {
            setVideoUrl(e.target.value);
            setThumbnailUrl(undefined);
          }}
          style={{ resize: 'vertical', width: '100%' }}
        />
        <TextArea
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ resize: 'vertical', width: '100%' }}
        />
        <TextArea
          id="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          style={{ resize: 'vertical', width: '100%' }}
        />
        <ButtonSection>
          {canUpload && <Button type="button" onClick={handleUpload}>Upload</Button>}
          <Button type="button" onClick={handleClose}>Cancel</Button>
        </ButtonSection>
        {error && <ErrorText>{error}</ErrorText>}
      </Form>
      {thumbnailUrl ? (
        <VideoText>
          <VideoImage src={thumbnailUrl} alt="Video Thumbnail" />
          <VideoErrorText>Video URL is playable</VideoErrorText>
        </VideoText>
      ) : (
        <VideoText>
          <VideoImage src="/Thumbnail_Not_Found.png" alt="Thumbnail Not Found" />
          <VideoErrorText>Video URL is not playable</VideoErrorText>
        </VideoText>
      )}
    </UploadFormContainer>
  );
};
