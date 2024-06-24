import { useState, useContext } from 'react';
import { appContext } from '@_context/context';
import { CommentParams } from '@_interfaces/types';
import styled from 'styled-components';
import { borderRadius, colors } from '@_constants/styleConstants';
import { validateStringNotEmpty, validateUserId } from '@_validators/videoValidators';
import { createComment } from '@_services/videosService';

const Comments = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 6px;
  width:100%;
`;

const Comment = styled.div``;

const CreateComment = styled.form`
  display: flex;
  flex-direction: column;
  background-color:${colors.primarys0l15};
  border-radius: ${borderRadius}px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.primarys0l15};
  border-radius: ${borderRadius}px;

  &::placeholder {
    color: ${colors.white};
    opacity: 0.7;
  }
`;

const Title = styled.div``;
const Text = styled.div``;
const Date = styled.div``;

const SubmitButton = styled.button`
  background-color: ${colors.primarys0l15};
  color: ${colors.white};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: ${borderRadius}px;

  &:hover {
    background-color: ${colors.primarys0l25};
  }
`;

const ErrorText = styled.div`
  color: ${colors.red};
`;

export const VideoComments = () => {
  const {
    singleVideo,
    videoComments,
    setIsVideoUpdated,
    setIsCommentCreated,
  } = useContext(appContext);
  const [userId, setUserId] = useState<string>('');
  const [userComment, setUserComment] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUserId(userId)) {
      setError('Invalid User ID');
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
        user_id: userId,
      });
      if (newComment) {
        setIsVideoUpdated(true);
        setIsCommentCreated(true);
        setUserComment('');
        setUserId('');
        setError('');
      }
    } catch (error) {
      setError('Failed to create comment');
      console.error(error);
    }
  };

  if (!videoComments) return null

  return (
    <Comments>
      <CreateComment onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Comment"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
        <SubmitButton type="submit">Upload</SubmitButton>
        {error && <ErrorText>{error}</ErrorText>}
      </CreateComment>
      {videoComments.map((comment: CommentParams) => (
        <Comment key={comment.id}>
          <Title>{comment.user_id}</Title>
          <Date>{comment.created_at}</Date>
          <Text>{comment.content}</Text >
        </Comment>
      ))}
    </Comments>
  )
}