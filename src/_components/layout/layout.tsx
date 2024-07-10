import { useRef, useState, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { useClickAway } from 'react-use';
import { borderRadius, colors, gapSize, sizeOfIcons, sizeOfIconsSmall, titleSize, titleSizeBig } from '@_constants/index';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@_assets/icons/search';
import { AppContextInterface, appContext } from '@_context/index';
import { UploadVideoIcon } from '@_assets/icons/uploadVideo';
import { UploadVideoForm } from '@_components/uploadVideoForm';
import { Button, SearchButton } from '@_components/button';
import { Input } from '@_components/input';
import { ExternalLink, Text, Title } from '@_components/text';
import { MyLogo } from '@_assets/icons/myLogo';
import { SomeoneLogo } from '@_assets/icons/someoneLogo';
import { LinkedIn } from '@_assets/icons/linkedIn';
import { GitHub } from '@_assets/icons/github';

// Styles
const StyleHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  height: 55px;
  padding: 0 5%;
  background-color: ${colors.primary};
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: ${gapSize}px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 3fr 1fr;
  }
`;

const ReturnToHomePage = styled(Link)`
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
  height: 2rem;
  width: 50%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const UploadVideoModel = styled.div`
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
  font-size: ${titleSize};
  border-radius: ${borderRadius}px;
  `;

const AccountHeader = styled.div`
  background-color: ${colors.primary};
  display: flex;
  height: 8rem;
  width: 100%;
  padding: 0 5%;
  align-items: center;
  gap: ${gapSize}px;
  border-bottom: 2px solid ${colors.primaryLight};
  z-index: 1;
`;

const UserLogo = styled.div``;

const UserDescription = styled.div`
  display: flex;
  flex-direction:column;
  align-items: start;
  `;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gapSize}px;
  width: 100%;
`;

const LinksSection = styled.div`
  display: flex;
  gap: ${gapSize}px;
`;

const MainContent = styled.div`
  margin:2rem 5%;
`;

const Footer = styled.div``;

const UploadButtonTitle = styled(Title)`
  @media (max-width: 600px) {
    display: none;
  }
`;

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
          <LogoImage onClick={handleLogoClick} src="/FULL_LOGO_COLOR.png" alt="Full Logo Color" />
        </ReturnToHomePage>
        <Search onSubmit={handleSearchSubmit}>
          <SearchButton type="submit">
            <SearchIcon fill='white' height={`${sizeOfIconsSmall}px`} />
          </SearchButton>
          <Input
            id="search"
            placeholder="Search"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            style={{
              boxShadow: "none",
            }}
          />
        </Search>
      </StyleHeader>
      <CurrentUsername>
        <AccountHeader>
          <UserLogo>
            {user.user_id !== "murad_aleskerov" ? (
              <SomeoneLogo height="5rem" />
            ) : (
              <MyLogo height="5rem" />
            )}
          </UserLogo>
          <UserDescription>
            <Title style={{ fontSize: titleSizeBig }}>
              {user.user_id}
            </Title>
            {user.user_id !== "murad_aleskerov" ? (
              <UserInfo>
                <Text>
                  Not a Full Stack Developer
                </Text>
                <ExternalLink href="https://www.linkedin.com">
                  <LinkedIn height={`${sizeOfIcons}px`} />
                </ExternalLink>
                <ExternalLink href="https://github.com">
                  <GitHub height={`${sizeOfIcons}px`} />
                </ExternalLink>
              </UserInfo>
            ) : (
              <UserInfo>
                <Text>
                  A Full Stack Developer
                </Text>
                <LinksSection>
                  <ExternalLink href="https://www.linkedin.com/in/murad-aleskerov/">
                    <LinkedIn height={`${sizeOfIcons}px`} />
                  </ExternalLink>
                  <ExternalLink href="https://github.com/MuradAles/ScopeLabs">
                    <GitHub height={`${sizeOfIcons}px`} />
                  </ExternalLink>
                </LinksSection>
              </UserInfo>
            )}
          </UserDescription>
          <Button onClick={toggleUploadForm} style={{ marginLeft: "auto" }}>
            <UploadVideoIcon fill={colors.transparent} width={`30px`} />
            <UploadButtonTitle>Upload New Video</UploadButtonTitle>
          </Button>
          <UploadVideoModel ref={ref}>
            {showUploadForm && <UploadVideoForm onClose={toggleUploadForm} />}
          </UploadVideoModel>
        </AccountHeader>
      </CurrentUsername>
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </>
  );
};
