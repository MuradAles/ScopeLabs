import { colors } from "@_constants/styleConstants";
import styled from "styled-components";

export const Title = styled.span`
  max-width: 80%;
  font-size: 1.1em;
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  line-height: 1.1;
  max-height: 2.2em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-word;
`;

export const Text = styled.span`
  color: ${colors.text};
  word-break: break-word;
`;

export const ErrorText = styled.div`
  color: ${colors.red};
`;
