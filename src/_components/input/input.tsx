import { colors } from "@_constants/styleConstants";
import styled from "styled-components";

export const InputTextArea = styled.textarea.attrs<{ id: string }>((props) => ({
  maxLength: 500,
  id: props.id,
}))`
  width: 80%;
  border: none;
  color: ${colors.white};
  background-color: transparent;
  font-size: 1rem;
  white-space: pre-wrap;
  overflow: hidden;
  resize: none;
  box-shadow: inset 0 -1px 0 0 ${colors.primarys0l50};
  height: 1.5rem;
  &:focus {
    outline: none;
  }
`;
