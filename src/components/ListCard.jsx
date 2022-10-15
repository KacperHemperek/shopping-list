import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MyText } from "../styled/MyText";
import { useNavigation } from "@react-navigation/native";
import styled, { useTheme } from "styled-components";
import { TrashIcon, ListBulletIcon } from "react-native-heroicons/solid";

const ListCard = ({ name, id, creator }) => {
    const navigation = useNavigation();
    const theme = useTheme();

    function redirectToList() {
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
            <CardButton>
                <TrashIcon size={20} color={theme.colors.text} />
            </CardButton>
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

const CardButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.red};
`;

export default ListCard;
