# ScopeLabs

This project is a Vite + React application with TypeScript.

## Table of Contents
- [Project Overview](#project-overview)
- [Project Screenshots](#project-screenshots)
- [Getting Started](#getting-started)
- [Build and Run](#build-and-run)
- [Libraries](#libraries)


## Project Overview

The project aims to develop a video management application using Vite and React with TypeScript. The application provides functionalities for managing videos, including viewing, creating, commenting, and full-screen playback with playback control options.

### App Functionality

1. **Video List and Selection**

    - Displays a list of videos.
    - Allows users to select a video from the list.
    
2. **Create New Video**

    - Users can create a new video object with a title, description, and video URL.

3. **Comments**

    - Users can comment on videos.
    - Comments from other users are visible.
    
4. **Full-Screen Playback**

    - Supports full-screen mode for video playback.
    - Includes playback controls: play, pause, seek, and fullscreen toggle.
    - Provides options for adjusting playback speed and volume.

### Extra Functionality

1. **Search by User ID**

    - Users can search for videos based on user_id.

2. **Thumbnail Display**

    - Displays thumbnailUrl if available for a video.
    - Shows a default picture if thumbnailUrl is not provided.

### Implementation Details

1. **Reactivity**

    - All components are reactive, ensuring updates are reflected immediately after actions like video uploads or comments.

2. **Validation Rules**

    - user_id: Should follow snake_case format.
    - Comments, Title, Description: Must have a minimum length of 1 character.
    - Video URL: It must be a valid link.

## Project Screenshots
1. **HomePage**
    - User allowed to look at a list of videos and select a video from the list.
    
![HomePage](https://github.com/user-attachments/assets/c26a11ec-2dad-48da-87d3-b1485a900514)

2. **UploadVideo**
    - User allowed to create a new video object with a title, description, and video URL
    
![UploadVideo](https://github.com/user-attachments/assets/af52a0fb-9a89-4d64-8ecf-453a5fb1a3da)

3. **SearchUser**
    - User can search for videos based on user_id.
    
![SearchUser](https://github.com/user-attachments/assets/735e9e3b-eae0-4021-a1d5-27d4ea640dcd)

4. **SignleVideo**
    - This is a single video component
    
![SignleVideo](https://github.com/MuradAles/ScopeLabs/assets/53098880/bfe8aab4-895c-4696-971a-4c59a7999e4a)

5. **EditVideo**
    - User allowed to edit the video
    
![EditVideo](https://github.com/user-attachments/assets/25ef4bc7-7cae-41fe-8590-c46ec5a315b5)

5. **AddComment**
    - User allowed to edit the video
    
![AddComment](https://github.com/user-attachments/assets/0cb01175-1dc0-4364-a156-a97730c920f0)

6. **Phone HomePage**

![PhoneHomePage](https://github.com/user-attachments/assets/6058d2e7-4be0-4957-918a-565b63ba9cd4)

7. **Phone SingleVideo**

![SignleVideo](https://github.com/user-attachments/assets/67e5460d-9f09-4956-a087-31b3068eb344)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager) or yarn

### Installation

1. **Clone the Repository (if applicable)**
  - https://github.com/MuradAles/ScopeLabs.git
  - cd ScopeLabs

2. **Install Dependencies**
  - npm install
  <br>or
  - yarn install

3. **Get Access from Cors (temporary)**
 - follow the link and 'Request temporary access to the demo serve', and you will get access to Cors
 - https://cors-anywhere.herokuapp.com/corsdemo


## Build and Run
3. **Run the Development Server**
<br>To start the development server, run:
  - npm run dev
  <br>or
  - yarn dev
    
This will start Vite’s development server, and you can view your application by opening your browser and navigating to http://localhost:5173.

### Build the Application
To create a production build of the application, run:
  - npm run build
  <br>or:
  - yarn build
  
This will compile your TypeScript and bundle your application using Vite.

### Preview the Production Build
You can preview the production build locally by running:
  - npm run preview
  <br>or:
  - yarn preview

This will start a local server to serve the built files, allowing you to test the production build.

## Libraries

### Dependencies
- **React** (`react`): A JavaScript library for building user interfaces.
- **ReactDOM** (`react-dom`): Provides DOM-specific methods that can be used at the top level of a React app.
- **React Router DOM** (`react-router-dom`): Declarative routing for React.
- **Styled Components** (`styled-components`): A library for styling React components using tagged template literals.
- **Axios** (`axios`): A promise-based HTTP client for making HTTP requests.
- **Date-fns** (`date-fns`): A library for manipulating JavaScript dates.
- **React Player** (`react-player`): A React component for playing various types of media files.
- **React Use** (`react-use`): A collection of essential React hooks.
- **@uidotdev/usehooks**: A set of utility hooks for React.
- **@types/node**: Type definitions for Node.js, necessary for TypeScript support.

### DevDependencies
- **TypeScript** (`typescript`): A typed superset of JavaScript that compiles to plain JavaScript.
- **@vitejs/plugin-react**: Official Vite plugin for React.
- **@types/react**: Type definitions for React.
- **@types/react-dom**: Type definitions for React DOM.
- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript.
- **@typescript-eslint/parser**: Parser for TypeScript used by ESLint.
- **ESLint** (`eslint`): A tool for identifying and fixing problems in JavaScript code.
- **eslint-plugin-react-hooks**: ESLint rules for React hooks.
- **eslint-plugin-react-refresh**: ESLint rules for React Refresh.
- **Vite** (`vite`): A fast build tool and development server.
