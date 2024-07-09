import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const moveCircle = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const MovingCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 100%;
  background-color: hsl(0, 0%, 16.07843137254902%);
  border-radius: 50%;
  filter: blur(100px);
  animation: ${moveCircle} 50s ease infinite;
`;

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
  animation: ${gradientAnimation} 5s ease infinite;
`;

const AnimatedGradientBackground: React.FC = () => {
  return (
    <AnimatedBackground>
      <MovingCircle />
    </AnimatedBackground>
  );
};

export default AnimatedGradientBackground;
