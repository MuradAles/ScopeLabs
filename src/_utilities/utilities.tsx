import { formatDistanceToNow } from 'date-fns';

export const formatDateDistance = (createdAt: string): string => {
  const date = new Date(createdAt);
  return formatDistanceToNow(date, { addSuffix: true });
};