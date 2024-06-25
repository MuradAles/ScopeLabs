import { formatDistanceToNow } from 'date-fns';

export const formatDateDistance = (createdAt: string): string => {
  const date = new Date(createdAt);
  const formattedDistance = formatDistanceToNow(date, { addSuffix: true });
  return formattedDistance.replace('about ', '');
};
