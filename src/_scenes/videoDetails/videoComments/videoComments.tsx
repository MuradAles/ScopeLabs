import { appContext } from '@_context/context';
import { Button, ErrorText, Input, Text, Title } from '@_components/index';
import { CommentParams } from '@_interfaces/types';
import { colors, borderRadius } from '@_constants/styleConstants';
import { createComment } from '@_services/videosService';
import { formatDateDistance } from '@_utilities/utilities';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { validateStringNotEmpty, validateUserId } from '@_validators/videoValidators';


const Comments = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
`;

const CreateComment = styled.form`
  display: flex;
  flex-direction: column;
  background-color:${colors.primarys0l15};
  border-radius: ${borderRadius}px;
  padding: 6px;
  gap: 6px;
`;

const Comment = styled.div`
  display:flex;
  flex-direction:column;
  background-color: ${colors.primarys0l15};
  padding: 6px;
  margin-top: 8px;
  border-radius: ${borderRadius}px;
`;

const CommentHeader = styled.div`
  display: flex;
  gap: 10px;
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
        <Button type="submit">Upload</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </CreateComment>
      {videoComments.map((comment: CommentParams) => (
        <Comment key={comment.id}>
          <CommentHeader>
            <Title>{comment.user_id}</Title>
            <Text>{formatDateDistance(comment.created_at)}</Text>
          </CommentHeader>
          <Text>{comment.content}</Text >
        </Comment>
      ))}
    </Comments>
  )
}