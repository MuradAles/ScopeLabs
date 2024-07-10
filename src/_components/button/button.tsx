import { borderRadius, colors } from '@_constants/index';
import styled from 'styled-components';


export const Button = styled.button`
  background-color: ${colors.orange};
  border: none;
  color: ${colors.white};
  border-radius: ${borderRadius}px;
  cursor: pointer;
  width: 4rem;
  padding: 6px 12px;
  box-shadow: 0 2px 0 0 ${colors.white};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.primaryBorder};
  }

  &:active {
    background-color: ${colors.primaryBorder};
    transform: translateY(4px);
    box-shadow: 0 0 2px ${colors.primaryWhite};;
  }
`;

export const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.white};
  border-radius: ${borderRadius}px;
  cursor: pointer;
  width: 30px;
  padding: 0;
  transition: all 0.2s ease;
`;