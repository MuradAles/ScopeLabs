import { useRef, useState, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { useClickAway } from 'react-use';
import { borderRadius, colors } from '@_constants/index';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@_assets/icons/search';
import { AppContextInterface, appContext } from '@_context/index';
import { UploadVideoIcon } from '@_assets/icons/uploadVideo';
import { UploadVideoForm } from '@_components/uploadVideoForm';
import { SearchButton } from '@_components/button';
import { Input } from '@_components/input';
import { HoverTooltip } from '@_components/hoverTooltip';
import { Title } from '@_components/text';

// Styles
const StyleHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10000;
  height: 100px;
  padding:1rem;
  background-color: ${colors.primarys0l15t95};
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
  position: relative;
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

const UploadVideo = styled.div`
  position: relative;
  justify-self: center;
  cursor: pointer;
`;

const CurrentUsername = styled.div`
  display:flex;
  align-items:center;
  font-size: 1.5rem;
  margin-top: 10px;
  margin-left: 25px;
`;

const MainContent = styled.div`
  margin:10px 25px;
`;

const Footer = styled.div``;


export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, setUser, setSelectedVideoId } = useContext(appContext) as AppContextInterface; // Accessing user state and setter functions from app context.
  const [localUsername, setLocalUsername] = useState(''); // Local state for storing temporary username input.
  const [showUploadForm, setShowUploadForm] = useState(false); // State for toggling visibility of the upload form.
  const ref = useRef(null); // Ref for detecting clicks outside a component using useClickAway hook.
  useClickAway(ref, () => { // Hook to close upload form when clicked outside.
    setShowUploadForm(false);
  });

  /**
   * Handles form submission for searching videos by username.
   * 
   * @param e - The form event object.
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedVideoId(null);
    setUser({ user_id: localUsername });
  };

  /**
   * Handles click event when logo is clicked, resetting user state and selected video ID.
   */
  const handleLogoClick = () => {
    setUser({ user_id: 'murad_aleskerov' });
    setSelectedVideoId(null);
    setLocalUsername('');
  };

  /**
   * Toggles visibility of the upload form.
   */
  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  return (
    <>
      <StyleHeader>
        <ReturnToHomePage to="/">
          <HoverTooltip tooltipContent="Return to Home">
            <LogoImage onClick={handleLogoClick} src="/FULL_LOGO_COLOR.png" alt="Full Logo Color" />
          </HoverTooltip>
        </ReturnToHomePage>
        <Search onSubmit={handleSearchSubmit}>
          <SearchButton type="submit">
            <HoverTooltip tooltipContent="Search Users">
              <SearchIcon fill='white' height={"20px"} />
            </HoverTooltip>
          </SearchButton>
          <Input
            id="search"
            placeholder="Search username"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            style={{
              boxShadow: "none",
            }}
          />
        </Search>
        <UploadVideo ref={ref}>
          <HoverTooltip tooltipContent="Upload Video">
            <UploadVideoIcon fill='white' height={"30px"} onClick={toggleUploadForm} />
          </HoverTooltip>
          {showUploadForm && <UploadVideoForm onClose={toggleUploadForm} />}
        </UploadVideo>
      </StyleHeader>
      <CurrentUsername>
        <Title>
          You watching {user.user_id}
        </Title>
      </CurrentUsername>
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </>
  );
};