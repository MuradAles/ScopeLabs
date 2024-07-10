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
import { ExternalLink, Text, Title } from '@_components/text';
import { MyLogo } from '@_assets/icons/myLogo';
import { SomeoneLogo } from '@_assets/icons/someoneLogo';

// Styles
const StyleHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  height: 100px;
  padding: 1rem;
  background-color: ${colors.primary};
  display: grid;
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
  border-radius: ${borderRadius}px;
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
  border: 2px solid ${colors.primaryBorder};
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
  width: 100%;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  font-size: 1.5rem;
  border-radius: ${borderRadius}px;
  `;

const AccountInformation = styled.div`
  background-color: ${colors.primaryLight};
  display: flex;
  width: 100%;
  padding: 0 3%;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${colors.white};
  z-index: 1;
`;

const UserDescription = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
`;

const MainContent = styled.div`
  margin:2rem 5%;
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
        <AccountInformation>
          {user.user_id !== "murad_aleskerov" ? (
            <SomeoneLogo height="10rem" />
          ) : (
            <MyLogo height="10rem" />
          )}
          <UserDescription>
            <Title>
              {user.user_id}
            </Title>
            {user.user_id !== "murad_aleskerov" ? (
              <>
                <Text>
                  Not a Full Stack Developer
                </Text>
                <ExternalLink href="https://www.linkedin.com">
                  https://www.linkedin.com
                </ExternalLink>
                <ExternalLink href="https://github.com">
                  https://github.com
                </ExternalLink>
              </>
            ) : (
              <>
                <Text>
                  A Full Stack Developer
                </Text>
                <ExternalLink href="https://www.linkedin.com/in/murad-aleskerov/">
                  linkedin.com/in/murad-aleskerov/
                </ExternalLink>
                <ExternalLink href="https://github.com/MuradAles/ScopeLabs">
                  github.com/MuradAles/ScopeLabs
                </ExternalLink>
              </>
            )}
          </UserDescription>
        </AccountInformation>
      </CurrentUsername>
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </>
  );
};