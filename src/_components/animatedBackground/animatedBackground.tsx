import React from 'react';
import styled from 'styled-components';

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  background: linear-gradient(-45deg, hsl(0, 0%, 10%), hsl(0, 0%, 15%), hsl(0, 0%, 20%));
  background-size: 300% 300%;
  background-image: radial-gradient(hsl(0, 0%, 64%) 1px, transparent 0);
  background-size: 40px 40px;
  background-position: -19px -19px;
`;

export const AnimatedGradientBackground: React.FC = () => {
  return (
    <AnimatedBackground />
  );
};
