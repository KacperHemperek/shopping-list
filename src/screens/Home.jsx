import { View } from "react-native";
import React, { useState } from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import { MyText } from "../styled/MyText";
import styled from "styled-components";
import { SafeArea } from "../styled/SafeArea";
import { Input } from "../styled/Input";
import { PlusSmallIcon } from "react-native-heroicons/solid";
import { Header, HeaderTitle } from "../styled/Header";
import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import useLists from "../hooks/useLists";
import { ListWrapper } from "../styled/ListWrapper";
import ListCard from "../components/ListCard";

const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

const Home = () => {
    const { handleLogOut } = useUser();
    const { createList, userLists } = useLists();

    const [listName, setListName] = useState(null);

    const navigation = useNavigation();

    function renderList() {
        return (
            userLists?.map((item, index) => (
                <ListCard
                    key={item.name + index}
                    id={item.id}
                    name={item.name}
                />
            )) ?? null
        );
    }

    return (
        <ScreenWrapper horizontalCenter>
            <SafeArea>
                <Header justifyBetween>
                    <HeaderTitle>Your Lists</HeaderTitle>
                    <View>
                        <LogoutButton
                            style={{ marginBottom: 4 }}
                            onPress={handleLogOut}
                        >
                            <ButtonText>Log Out</ButtonText>
                        </LogoutButton>
                        <LogoutButton
                            onPress={() => {
                                navigation.navigate("List");
                            }}
                        >
                            <ButtonText>List</ButtonText>
                        </LogoutButton>
                    </View>
                </Header>
                <ListWrapper>{renderList()}</ListWrapper>
                <NewListWrapper
                    behavior={Platform.OS === "ios" ? "position" : null}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <InputWrapper>
                        <NewListInput
                            placeholder="new list name"
                            onChangeText={setListName}
                            value={listName}
                        />
                        <Button
                            onPress={() => {
                                createList(listName);
                                setListName("");
                            }}
                        >
                            <PlusSmallIcon
                                color="#E7F6F2"
                                size={24}
                                fontWeight={800}
                            />
                        </Button>
                    </InputWrapper>
                </NewListWrapper>
            </SafeArea>
        </ScreenWrapper>
    );
};

const LogoutButton = styled.TouchableOpacity`
    padding: 6px 12px;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 4px;
`;

const ButtonText = styled(MyText)`
    font-weight: 700;
    text-align: center;
`;

const Button = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.lightBlue};
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 400px;
    margin-left: 16px;
`;

const NewListInput = styled(Input)`
    flex: 1;
    margin-bottom: 0;
    height: 50px;
`;

const InputWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const NewListWrapper = styled.KeyboardAvoidingView`
    padding: 0 16px 16px 16px;
    width: 100%;
    justify-items: center;
    position: absolute;
    bottom: 0;
`;

export default Home;
