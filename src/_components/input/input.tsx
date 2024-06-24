import { borderRadius, colors } from "@_constants/styleConstants";
import styled from "styled-components";

export const Input = styled.input.attrs({ maxLength: 200 })`
  height: 100%;
  width: 100%;
  border: none;
  color: ${colors.white};
  background-color: transparent;
  font-size: 1rem;
  border: 1px solid ${colors.primarys0l50};
  border-radius: ${borderRadius}px;
  padding: 6px;

  &:focus {
    outline: none;
  }
`;