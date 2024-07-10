import { colors, textSize } from "@_constants/styleConstants";
import styled from "styled-components";

const inputStyles = `
  border: none;
  color: ${colors.text};
  background-color: ${colors.transparent};
  font-size: ${textSize};
  box-shadow: inset 0 -1px 0 0 ${colors.primaryBorder};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${colors.textDark};
  }
`;

export const Input = styled.input.attrs<{ id: string }>((props) => ({
  id: props.id,
}))`
  ${inputStyles};
  width: 80%;
  height: 1.5rem;
`;

export const TextArea = styled.textarea.attrs<{ id: string }>((props) => ({
  maxLength: 500,
  id: props.id,
}))`
  ${inputStyles};
  width: 80%;
  white-space: pre-wrap;
  overflow: hidden;
  resize: none;
  height: 1.5rem;
`;

export const TextAreaDescription = styled.textarea.attrs<{ id: string }>((props) => ({
  maxLength: 500,
  id: props.id,
}))`
  ${inputStyles};
  background-color: ${colors.primaryLight};
  width: 80%;
  white-space: pre-wrap;
  overflow: hidden;
  resize: vertical;
  min-height: 5rem;
  max-height: 10rem;
`;