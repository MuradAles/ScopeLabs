import { createContext, useState, ReactNode, useContext } from 'react';
import { VideoParams } from '@_interfaces/index';

interface UserContextProps {
  username: string;
  setUsername: (username: string) => void;
  videos: VideoParams[];
  setVideos: (videos: VideoParams[]) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('john_smith');
  const [videos, setVideos] = useState<VideoParams[]>([]);

  return (
    <UserContext.Provider value={{ username, setUsername, videos, setVideos }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
