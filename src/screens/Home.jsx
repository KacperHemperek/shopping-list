import React, { useEffect, useState } from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import { MyText } from "../styled/MyText";
import { supabase } from "../../supabaseClient";
import styled from "styled-components";
import { SafeArea } from "../styled/SafeArea";
import ListItem from "../components/ListItem";
import { Input } from "../styled/Input";
import { PlusSmallIcon, TrashIcon } from "react-native-heroicons/solid";
import { Alert } from "react-native";

const Home = () => {
    const [userName, setUserName] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("");

    const [items, setItems] = useState([]);

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
            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
    }, []);

    function addListItem() {
        if (!desc || !amount) {
            Alert.alert(
                "Cannot add empty list item",
                "Both item description and amount must be provided"
            );
            return;
        }

        console.log(items);
        const id = Math.floor(Math.random() * 1000);
        const newItem = { id, description: desc, amount, checked: false };
        setItems([...items, newItem]);
        setDesc("");
        setAmount("");
    }

    function setChecked(id) {
        const newArray = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(newArray);
    }

    function deleteChecked() {
        const newArray = items.filter((item) => !item.checked);
        setItems(newArray);
    }

    function renderList() {
        return items.map((item) => (
            <ListItem
                key={item.id}
                {...item}
                setChecked={() => setChecked(item.id)}
            />
        ));
    }
    return (
        <ScreenWrapper>
            <SafeArea>
                <Header>
                    <Title>{userName}'s List</Title>
                    <LogoutButton onPress={handleLogOut}>
                        <ButtonText>Log Out</ButtonText>
                    </LogoutButton>
                </Header>
                <InputWrapper>
                    <CustomInput
                        placeholder="Item Description"
                        onChangeText={setDesc}
                        value={desc}
                    />
                </InputWrapper>
                <InputWrapper>
                    <CustomInput
                        placeholder="Amount"
                        onChangeText={setAmount}
                        value={amount}
                    />
                    <IconWrapper onPress={addListItem}>
                        <PlusSmallIcon
                            color="#E7F6F2"
                            size={24}
                            fontWeight={800}
                        />
                    </IconWrapper>
                </InputWrapper>
                <ListWrapper>{renderList()}</ListWrapper>
                <FloatingButton onPress={deleteChecked}>
                    <TrashIcon size={30} color="#E7F6F2" />
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

const ListWrapper = styled.ScrollView.attrs((props) => ({
    contentContainerStyle: {
        padding: 16,
        paddingBottom: 80,
    },
}))``;

export default Home;
