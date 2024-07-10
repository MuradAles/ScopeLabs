import { borderRadius, colors, gapSize } from '@_constants/index';
import styled from 'styled-components';


export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${gapSize}px;
  background-color: ${colors.orange};
  color: ${colors.white};
  border: none;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: ${colors.primaryBorder};
  }

  &:active {
    background-color: ${colors.primaryLight};
  }
`;

export const SearchButton = styled.button`
  background-color: ${colors.transparent};
  border: none;
  color: ${colors.white};
  border-radius: ${borderRadius}px;
  cursor: pointer;
  width: 30px;
  padding: 0;
  transition: all 0.2s ease;
`;