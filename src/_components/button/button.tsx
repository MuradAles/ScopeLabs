import { borderRadius, colors } from '@_constants/index';
import styled from 'styled-components';


export const Button = styled.button`
  background-color: ${colors.primary};
  border: none;
  color: white;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  width: fit-content;
  padding: 6px 12px;
  &:hover {
    background-color: ${colors.primarys0l25};
  }
`;