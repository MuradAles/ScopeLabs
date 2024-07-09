// src/_components/hoverTooltip/hoverTooltip.tsx

import styled, { css } from 'styled-components';
import { colors } from '@_constants/styleConstants';

interface HoverTooltipProps {
  tooltipContent: string;
}

export const HoverTooltip = styled.div<HoverTooltipProps>`
  position: relative;

  &:hover::after {
    content: '${props => props.tooltipContent}';
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 10px;
    background-color: ${colors.primarys0l25};
    color: white;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  ${props =>
    props.tooltipContent === 'Return to Home' &&
    css`
      @media (max-width: 600px) {
        &:hover::after {
          left: 10%;
          transform: translateX(0);
        }
      }
    `}

  ${props =>
    props.tooltipContent === 'Search Users' &&
    css`
      @media (max-width: 600px) {
        &:hover::after {
          left: 20%;
          transform: translateX(0);
        }
      }
    `}
  
  ${props =>
    props.tooltipContent === 'Upload Video' &&
    css`
      @media (max-width: 600px) {
        &:hover::after {
          left: -200%;
          transform: translateX(0);
        }
      }
    `}
`;
