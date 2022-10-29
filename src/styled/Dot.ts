import styled from "styled-components";

export const Dot = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightRed};
  position: absolute;
  right: -6px;
  top: -6px;
`;
