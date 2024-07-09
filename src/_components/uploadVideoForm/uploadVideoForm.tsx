import { useContext, useState } from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '@_constants/index';

import { createVideo } from '@_services/videosService';
import { validateStringNotEmpty, validateUrl } from '@_validators/index';
import { AppContextInterface, appContext } from '@_context/context';
import { Button } from '@_components/button';
import { InputTextArea } from '@_components/input';

// Styles
const UploadFormContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 200px;
  right: 10%;
  background-color: ${colors.primarys0l25};
  padding: 10px;
  border-radius: ${borderRadius}px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Header = styled.form`
  display:flex;
  justify-content: center;
  margin: 0 5px 5px 5px;
  font-size:  1.2rem;
  font-weight: 550;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ErrorText = styled.div`
  color: ${colors.red};
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
      onClose();
    } catch (error) {
      console.error('Failed to create video:', error);
    }
  };

  return (
    <UploadFormContainer>
      <Header>Upload Video</Header>
      <Form onSubmit={handleSubmit}>
        <InputTextArea
          id="video_url"
          placeholder="Video URL"
          onChange={(e) => setVideoUrl(e.target.value)}
          style={{ resize: "vertical" }}
        />
        <InputTextArea
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ resize: "vertical" }}
        />
        <InputTextArea
          id="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          style={{ resize: "vertical" }}
        />
        <Button type="submit">Upload</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </Form>
    </UploadFormContainer>
  );
};
