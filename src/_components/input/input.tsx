import { borderRadius, colors } from "@_constants/styleConstants";
import styled from "styled-components";

export const Input = styled.input.attrs({ maxLength: 500 })`
  height: 100%;
  width: 100%;
  border: none;
  color: ${colors.white};
  background-color: transparent;
  font-size: 1rem;
  border-radius: ${borderRadius}px;
  box-shadow: inset 0 0 2px ${colors.primarys0l50};

  &:focus {
    outline: none;
  }
`;

export const InputVideo = styled.input.attrs({ maxLength: 500 })`
  height: 100%;
  width: 100%;
  border: none;
  color: ${colors.white};
  background-color: transparent;
  font-size: 1rem;
  border-radius: ${borderRadius}px;
  box-shadow: inset 0 0 2px ${colors.primarys0l50};
  position: relative;
  top: -2px;
  left: -2px;

  &:focus {
    outline: none;
  }
`;