import styled from 'styled-components';
import { colors } from '@_constants/styleConstants';

export const HoverTooltip = styled.div<{ tooltipContent: string }>`
  position: relative;

  &:hover::after {
    content: '${props => props.tooltipContent}';
    position: absolute;
    top: 100%; 
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
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
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
`;
