import React, { useEffect, useState } from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import { MyText } from "../styled/MyText";
import { supabase } from "../../supabaseClient";
import styled from "styled-components";
import { SafeArea } from "../styled/SafeArea";
import ListItem from "../components/ListItem";

const mockData = [
    { id: 1, checked: false, description: "eggs", amount: "10pc." },
    { id: 2, checked: false, description: "cheese", amount: "100g" },
    { id: 3, checked: true, description: "milk", amount: "1pc." },
];

const Home = () => {
    const [userName, setUserName] = useState("");

    async function handleLogOut() {
        try {
            supabase.auth.signOut();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = (await supabase.auth.getUser()).data.user
                    .user_metadata.username;

                setUserName(response);
            } catch (error) {}
        }

        fetchUser();
    }, []);

    function renderList() {
        return mockData.map((item) => <ListItem key={item.id} {...item} />);
    }

    return (
        <ScreenWrapper horizontalCenter>
            <SafeArea>
                <Header>
                    <Title>{userName}'s List</Title>
                    <LogoutButton onPress={handleLogOut}>
                        <ButtonText>Log Out</ButtonText>
                    </LogoutButton>
                </Header>
                <ListWrapper>{renderList()}</ListWrapper>
            </SafeArea>
        </ScreenWrapper>
    );
};

const Title = styled(MyText)`
    font-size: 26px;
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 16px;
    justify-content: space-between;
`;

const LogoutButton = styled.TouchableOpacity`
    padding: 6px 12px;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 4px;
`;
const ButtonText = styled(MyText)`
    font-weight: 700;
`;

const ListWrapper = styled.View`
    padding: 0 16px;
`;

export default Home;
