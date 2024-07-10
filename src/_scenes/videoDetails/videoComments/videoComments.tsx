import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AppContextInterface, appContext } from '@_context/context';
import { Button, ErrorText, TextArea, Text, Title } from '@_components/index';
import { CommentParams } from '@_interfaces/types';
import { colors, borderRadius } from '@_constants/styleConstants';
import { createComment } from '@_services/videosService';
import { formatDateDistance } from '@_utilities/utilities';
import { validateStringNotEmpty } from '@_validators/videoValidators';

const slideDown = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CreateComment = styled.form<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary};
  border-radius: ${borderRadius}px;
  padding: 6px;
  min-height: ${props => (props.isExpanded ? '4rem' : '2.3rem')};
  transition: min-height 0.5s ease-in-out;
  position: relative;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
  margin-top: 8px;
  border-radius: ${borderRadius}px;
`;

const CommentHeader = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 4px;
  display: flex;
  justify-content: flex-end;
`;

const UploadButton = styled(Button)`
  visibility: visible;
  animation: ${slideDown} 0.8s ease-in-out;
  margin-left: 10px;
`;

const CancelButton = styled(Button)`
  visibility: visible;
  animation: ${slideDown} 0.8s ease-in-out;
  margin-left: 10px;
`;

export const VideoComments = () => {
  const {
    accountUser,
    singleVideo,
    videoComments,
    setIsVideoUpdated,
    setIsCommentCreated,
  } = useContext(appContext) as AppContextInterface;
  const [userComment, setUserComment] = useState<string>('');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setUserComment('');
    setError('');
    setIsExpanded(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleVideo) {
      return;
    }
    if (!validateStringNotEmpty(userComment)) {
      setError('Comment cannot be empty');
      return;
    }
    try {
      const newComment = await createComment({
        video_id: singleVideo.id,
        content: userComment,
        user_id: accountUser.user_id,
      });
      if (newComment) {
        setIsVideoUpdated(true);
        setIsCommentCreated(true);
        setUserComment('');
        setError('');
        setIsExpanded(false);
      }
    } catch (error) {
      setError('Failed to create comment');
      console.error(error);
    }
  };

  if (!videoComments) return null;

  return (
    <Comments>
      <CreateComment onSubmit={handleSubmit} isExpanded={isExpanded}>
        <TextArea
          id="comment"
          placeholder="Add a comment..."
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          onFocus={handleFocus}
          style={{ resize: "vertical", width: '100%' }}
        />
        {isExpanded && (
          <ButtonsContainer>
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
            <UploadButton type="submit">Upload</UploadButton>
          </ButtonsContainer>
        )}
      </CreateComment>
      {error && <ErrorText>{error}</ErrorText>}
      {videoComments.map((comment: CommentParams) => (
        <Comment key={comment.id}>
          <CommentHeader>
            <Title>{comment.user_id}</Title>
            <Text>{formatDateDistance(comment.created_at)}</Text>
          </CommentHeader>
          <Text>{comment.content}</Text>
        </Comment>
      ))}
    </Comments>
  );
};
