import styled from "styled-components";
import { MyText } from "./MyText";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: ${(props) =>
    props.justifyBetween ? "space-between" : "flex-start"};
`;

export const HeaderTitle = styled(MyText)`
  font-size: 26px;
  font-weight: 700;
`;
