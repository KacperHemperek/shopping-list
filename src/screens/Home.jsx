import { View, Text } from "react-native";
import React from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import { MyText } from "../styled/MyText";
import styled from "styled-components";
import { SafeArea } from "../styled/SafeArea";
import { Input } from "../styled/Input";
import { PlusSmallIcon } from "react-native-heroicons/solid";
import { Header, HeaderTitle } from "../styled/Header";
import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const { userName, handleLogOut } = useUser();

    const navigation = useNavigation();

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
                <NewListWrapper>
                    <NewListInput placeholder="new list name" />

                    <Button>
                        <PlusSmallIcon
                            color="#E7F6F2"
                            size={24}
                            fontWeight={800}
                        />
                    </Button>
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
    text-align: center
    ;
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
    flex: 4;
    margin: 0;
    height: 50px;
`;

const NewListWrapper = styled.KeyboardAvoidingView`
    align-items: center;
    flex-direction: row;
    bottom: 0;
    width: 100%;
    padding: 0 16px 16px 16px;
    position: absolute;
`;

export default Home;
