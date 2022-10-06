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
import useItemList from "../hooks/useItemsList";

const Home = () => {
    const [userName, setUserName] = useState("");
    // const [desc, setDesc] = useState("");
    // const [amount, setAmount] = useState("");

    // const [items, setItems] = useState([]);

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

    //     async function fetchItems() {
    //         let userId = (await supabase.auth.getUser()).data.user.id;

    //         try {
    //             const { data, error } = await supabase
    //                 .from("items")
    //                 .select("*")
    //                 .eq("creator_id", userId);

    //             const date = new Date(data[0].created_at);
    //             console.log(Number(date));

    //             setItems(
    //                 data.sort(
    //                     (a, b) =>
    //                         Number(new Date(a.created_at)) -
    //                         Number(new Date(b.created_at))
    //                 )
    //             );
    //             if (error) {
    //                 console.error(error);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     async function setupSubscription() {
    //         let userId = (await supabase.auth.getUser()).data.user.id;

    //         supabase
    //             .channel(`public:items:creator_id=eq.${userId}`)
    //             .on(
    //                 "postgres_changes",
    //                 {
    //                     event: "INSERT",
    //                     schema: "public",
    //                     table: "items",
    //                 },
    //                 (payload) => {
    //                     setItems((prevArray) => [...prevArray, payload.new]);
    //                 }
    //             )
    //             .on(
    //                 "postgres_changes",
    //                 {
    //                     event: "DELETE",
    //                     schema: "public",
    //                     table: "items",
    //                 },
    //                 (payload) => {
    //                     console.log(payload);
    //                     setItems((prevArray) =>
    //                         prevArray.filter(
    //                             (item) => item.id !== payload.old.id
    //                         )
    //                     );
    //                 }
    //             )
    //             .subscribe();
    //     }

    //     setupSubscription();
    //     fetchUser();
    //     fetchItems();
    // }, []);

    // async function addListItem() {
    //     if (!desc || !amount) {
    //         Alert.alert(
    //             "Cannot add empty list item",
    //             "Both item description and amount must be provided"
    //         );
    //         return;
    //     }

    //     try {
    //         const id = (await supabase.auth.getUser()).data.user.id;

    //         const { error } = await supabase
    //             .from("items")
    //             .insert({ desc, amount, checked: false, creator_id: id });

    //         if (error) {
    //             console.error(error);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }

    //     setDesc("");
    //     setAmount("");
    // }

    // async function setChecked(id, checked) {
    //     const { error } = await supabase
    //         .from("items")
    //         .update({ checked: !checked })
    //         .eq("id", id)
    //         .select("*");

    //     if (!error) {
    //         setItems((prevArray) =>
    //             prevArray.map((item) =>
    //                 item.id === id ? { ...item, checked: !item.checked } : item
    //             )
    //         );
    //     } else {
    //         console.error(error);
    //     }
    // }

    // async function deleteChecked() {
    //     try {
    //         const ids = items
    //             .filter((item) => item.checked)
    //             .map((item) => item.id);
    //         console.log(ids);
    //         await supabase.from("items").delete().in("id", ids);
    //     } catch (error) {
    //         console.error(error);
    //     }

    //     // const newArray = items.filter((item) => !item.checked);
    //     // setItems(newArray);
    // }

    const {
        addListItem,
        amount,
        deleteChecked,
        desc,
        setAmount,
        setChecked,
        setDesc,
        items,
    } = useItemList();

    function renderList() {
        return items.map((item) => (
            <ListItem
                key={item.id}
                {...item}
                setChecked={() => setChecked(item.id, item.checked)}
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
