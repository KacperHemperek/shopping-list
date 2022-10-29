import React from "react";
import styled from "styled-components/native";
import Checkbox from "./Checkbox";
import { MyText } from "../styled/MyText";
import { Platform } from "react-native";

const ListItem = ({ desc, checked, amount, setChecked }) => {
  return (
    <ItemWrapper onPress={setChecked}>
      <ItemBody>
        <Checkbox
          label={desc}
          checked={checked}
          setChecked={setChecked}
          disableBuiltInState={true}
          removeAnimation={true}
        />
        <Amount>{amount}</Amount>
        <Line checked={checked} />
      </ItemBody>
    </ItemWrapper>
  );
};

const Line = styled.View<{ checked: boolean }>`
  width: ${Platform.OS === "android" ? "89%" : "88%"};
  position: absolute;
  height: 1px;
  top: 23px;
  right: 8px;
  background-color: ${({ theme }) => theme.colors.text};
  display: ${(props) => (props.checked ? "flex" : "none")};
`;

const ItemBody = styled.View`
  position: relative;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px 7px;
`;

const ItemWrapper = styled.TouchableWithoutFeedback`
  border-collapse: collapse;
  flex-direction: row;
`;

const Amount = styled(MyText)`
  font-weight: 400;
  font-size: 16px;
`;

export default ListItem;
