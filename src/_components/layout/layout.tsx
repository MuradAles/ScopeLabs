import { useRef, useState, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { useClickAway } from 'react-use';
import { borderRadius, colors, gapSize, gapSizeSmall, sizeOfIconsSmall, textSize } from '@_constants/index';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@_assets/icons/search';
import { AppContextInterface, appContext } from '@_context/index';
import { UploadVideoIcon } from '@_assets/icons/uploadVideo';
import { UploadVideoForm } from '@_components/uploadVideoForm';
import { Button, SearchButton } from '@_components/button';
import { Input } from '@_components/input';
import { Title } from '@_components/text';
import { MyLogo } from '@_assets/icons/myLogo';
import { SomeoneLogo } from '@_assets/icons/someoneLogo';
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
  justify-content: space-between;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: ${gapSize}px;
  border-bottom: 2px solid ${colors.primaryBorder};

  & > *:first-child {
    justify-self: start;
  }

  & > *:nth-child(2) {
    justify-self: center;
  }

  & > *:last-child {
    justify-self: end;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr 3fr 3fr;
  }
`;

const LogoImage = styled.img`
  height: 3rem;  
  width: 11rem;  
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
  width: 80%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ReturnToHomePage = styled(Link)`
`;

const UserDescription = styled.div`
  display: flex;
  align-items: center;
  gap: ${gapSizeSmall}px;
`;

const MainContent = styled.div`
  margin: 2rem 5% 5rem;
`;

const UploadVideoModel = styled.div`
  position: fixed;
  justify-self: center;
  width: 100%;
  max-width: 100vw;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const UploadButtonTitle = styled(Title)`
  @media (max-width: 600px) {
    display: none;
  }
`;

const UploadButton = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 5%;
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
        <UserDescription>
          <Title style={{ fontSize: textSize }}>
            {user.user_id}
          </Title>
          {user.user_id !== "murad_aleskerov" ? (
            <SomeoneLogo height="2.5rem" />
          ) : (
            <MyLogo height="2.5rem" />
          )}
        </UserDescription>
      </StyleHeader>
      <MainContent>
        {children}
      </MainContent>
      <UploadVideoModel ref={ref}>
        {showUploadForm && <UploadVideoForm onClose={toggleUploadForm} />}
      </UploadVideoModel>
      <UploadButton>
        <Button onClick={toggleUploadForm} style={{ marginLeft: "auto" }}>
          <UploadVideoIcon fill={colors.transparent} width={`30px`} />
          <UploadButtonTitle>Upload New Video</UploadButtonTitle>
        </Button>
      </UploadButton>
    </>
  );
};

{/* <>
  <LinksSection>
    <ExternalLink href="https://www.linkedin.com/in/murad-aleskerov/">
      <LinkedIn height={`${sizeOfIcons}px`} />
    </ExternalLink>
    <ExternalLink href="https://github.com/MuradAles/ScopeLabs">
      <GitHub height={`${sizeOfIcons}px`} />
    </ExternalLink>
  </LinksSection>
</> */}