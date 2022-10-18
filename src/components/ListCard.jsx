import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { MyText } from "../styled/MyText";
import { useNavigation } from "@react-navigation/native";
import styled, { useTheme } from "styled-components";
import {
    TrashIcon,
    ListBulletIcon,
    PencilSquareIcon,
} from "react-native-heroicons/solid";

const ListCard = ({ name, id, creator, onEdit }) => {
    const navigation = useNavigation();
    const theme = useTheme();
    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState("");

    function redirectToList() {
        console.log(id);
        navigation.navigate("List", { listId: id });
    }

    return (
        <CardWrapper onPress={redirectToList}>
            <TitleWrapper>
                <StyledBuletListIcon size={34} color={theme.colors.text} />
                <View>
                    <CardTitle>{name}</CardTitle>
                    <Creator>{creator}</Creator>
                </View>
            </TitleWrapper>
            <ButtonGroup>
                <CardButton onPress={onEdit} type="secondary">
                    <PencilSquareIcon size={20} color={theme.colors.text} />
                </CardButton>
            </ButtonGroup>
        </CardWrapper>
    );
};

const CardWrapper = styled.TouchableOpacity`
    margin-bottom: 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TitleWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const StyledBuletListIcon = styled(ListBulletIcon)`
    margin-right: 12px;
`;

const CardTitle = styled(MyText)`
    font-size: 20px;
`;

const Creator = styled(MyText)`
    color: ${({ theme }) => theme.colors.gray};
`;
const ButtonGroup = styled.View`
    flex-direction: row;
`;

const CardButton = styled.TouchableOpacity`
    padding: 10px;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, type }) => {
        switch (type) {
            case "danger":
                return theme.colors.red;
            case "secondary":
                return theme.colors.blue;
            case "neutral":
                return "rgba(255, 255, 255, 0)";
            default:
                return theme.colors.lightBlue;
        }
    }};
    margin-left: 16px;
`;

export default ListCard;
