import { colors, textSize, titleSize } from "@_constants/styleConstants";
import styled from "styled-components";

export const Title = styled.span`
  max-width: 100%;
  font-size: ${titleSize};
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
  display: flex; 
  align-items: center;
  color: ${colors.textDark};
  word-break: break-word;
  font-size: ${textSize};
`;

export const ExternalLink = styled.a`
  font-size: ${textSize};
  color: ${colors.textDark};
  text-decoration: underline;
  cursor: pointer;
`;

export const ErrorText = styled.div`
  color: ${colors.red};
`;
