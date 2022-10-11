import React from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import styled, { useTheme } from "styled-components";
import { SafeArea } from "../styled/SafeArea";
import ListItem from "../components/ListItem";
import { Input } from "../styled/Input";
import { PlusSmallIcon, TrashIcon } from "react-native-heroicons/solid";
import useItemList from "../hooks/useItemsList";
import { Header, HeaderTitle } from "../styled/Header";
import useUser from "../hooks/useUser";
import BackButton from "../components/BackButton";
import { ListWrapper } from "../styled/ListWrapper";
import LoadingScreen from "./LoadingScreen";

const List = ({ route }) => {
    const { userName, error: userError } = useUser();
    const { listId } = route.params;
    const {
        addListItem,
        amount,
        deleteChecked,
        desc,
        setAmount,
        setChecked,
        setDesc,
        items,
        error: itemsError,
    } = useItemList(listId);

    const theme = useTheme();

    function renderList() {
        return (
            items?.map((item) => (
                <ListItem
                    key={item.id}
                    {...item}
                    setChecked={() => setChecked(item.id, item.checked)}
                />
            )) ?? null
        );
    }

    if ((!items && !itemsError) || (!userName && !userError)) {
        return <LoadingScreen />;
    }

    return (
        <ScreenWrapper>
            <SafeArea>
                <Header>
                    <BackButton />
                    <HeaderTitle>{userName}'s List</HeaderTitle>
                </Header>
                <InputWrapper>
                    <CustomInput
                        placeholder="e.g. ham, cheese, milk"
                        onChangeText={setDesc}
                        value={desc}
                    />
                </InputWrapper>
                <InputWrapper>
                    <CustomInput
                        placeholder="e.g. 100g, 2pc, 250ml"
                        onChangeText={setAmount}
                        value={amount}
                    />
                    <IconWrapper onPress={addListItem}>
                        <PlusSmallIcon
                            color={theme.colors.text}
                            size={24}
                            fontWeight={800}
                        />
                    </IconWrapper>
                </InputWrapper>
                <ListWrapper>{renderList()}</ListWrapper>
                <FloatingButton onPress={deleteChecked}>
                    <TrashIcon size={30} color={theme.colors.text} />
                </FloatingButton>
            </SafeArea>
        </ScreenWrapper>
    );
};

const FloatingButton = styled.TouchableOpacity`
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: #d32f2f;
    border-radius: 400px;
    bottom: 16px;
    right: 16px;
    justify-content: center;
    align-items: center;
`;

const IconWrapper = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 400px;
    background-color: ${({ theme }) => theme.colors.lightBlue};
    justify-content: center;
    align-items: center;
    margin-left: 16px;
`;

const CustomInput = styled(Input)`
    flex: 4;
    margin-bottom: 0;
    height: 50px;
    padding: 0 16px;
`;

const InputWrapper = styled.View`
    flex-direction: row;
    padding: 24px 16px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-top: 8px;
`;

export default List;
