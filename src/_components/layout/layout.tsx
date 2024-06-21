import { useRef, useState, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { useClickAway } from 'react-use';
import { borderRadius, colors } from '@_constants/index';
import { Link } from 'react-router-dom';

import { SearchIcon } from '@_assets/icons/search';
import { appContext } from '@_context/index';
import { UploadVideoIcon } from '@_assets/icons/uploadVideo';
import { UploadVideoForm } from './uploadVideoForm';

const StyleHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10000;
  height: 100px;
  padding:1rem;
  background-color: ${colors.primarys0l15};
  display:grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 5fr 1fr;
  grid-column-gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 10fr 1fr;
  }
`;

const ReturnToHomePage = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const LogoImage = styled.img`
  height: 3rem;  
  width: 12rem;  
  justify-self: center;
  cursor: pointer;

  @media (max-width: 600px) {
    content: url('/LOGO_ICON.png');
    width: 3rem;
  }
`;

const Search = styled.form`
  display:flex;
  align-items: center;
  justify-self: center;
  border: 2px solid ${colors.primarys0l25};
  border-radius: ${borderRadius}px;
  height: 2.5rem;
  width: 80%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const InputButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputName = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  color: ${colors.white};
  background-color: transparent;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

const UploadVideo = styled.div`
  position: relative;
  justify-self: center;
  cursor: pointer;
`;

const CurrentUsername = styled.div`
  display:flex;
  align-items:center;
  font-size: 1.5rem;
  margin-left: 25px;
`;

const MainContent = styled.div`
  margin:10px 25px;
`;

const Footer = styled.div``;


export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useContext(appContext);
  const [localUsername, setLocalUsername] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowUploadForm(false)
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ user_id: localUsername });
  };

  const handleLogoClick = () => {
    setUser({ user_id: 'john_smith' });
    setLocalUsername('');
  };

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  return (
    <>
      <StyleHeader>
        <ReturnToHomePage to="/">
          <LogoImage onClick={handleLogoClick} src="/FULL_LOGO_COLOR.png" alt="Full Logo Color" />
        </ReturnToHomePage>
        <Search onSubmit={handleSearchSubmit}>
          <InputButton type="submit">
            <SearchIcon fill='white' height={"20px"} />
          </InputButton>
          <InputName
            placeholder="Search username"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
          />
        </Search>
        <UploadVideo ref={ref}>
          <UploadVideoIcon fill='white' height={"30px"} onClick={toggleUploadForm} />
          {showUploadForm && <UploadVideoForm onClose={toggleUploadForm} />}
        </UploadVideo>
      </StyleHeader>
      <CurrentUsername>
        You watching {user.user_id}
      </CurrentUsername>
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </>
  );
};