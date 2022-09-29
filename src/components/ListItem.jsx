import { View } from "react-native";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import { MyText } from "../styled/MyText";

const ListItem = ({ id, description, checked, amount }) => {
    const [localCheck, setLocalCheck] = useState(checked);

    return (
        <ItemWrapper
            onPress={() => {
                setLocalCheck((prev) => !prev);
            }}
        >
            <Checkbox
                label={description}
                checked={localCheck}
                setChecked={() => setLocalCheck((prev) => !prev)}
                textDecoration={true}
            />
            <Amount>{amount}</Amount>
        </ItemWrapper>
    );
};

const ItemWrapper = styled.TouchableOpacity`
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.lightBlue};
    border-collapse: collapse;
    padding: 10px 7px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Amount = styled(MyText)`
    font-weight: 400;
    font-size: 16px;
`;

export default ListItem;
