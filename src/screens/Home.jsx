import { View } from "react-native";
import React, { useState } from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import { MyText } from "../styled/MyText";
import styled, { useTheme } from "styled-components";
import { SafeArea } from "../styled/SafeArea";
import { Input, Label, LabelWrapper } from "../styled/Input";
import { PlusSmallIcon } from "react-native-heroicons/solid";
import { Header, HeaderTitle } from "../styled/Header";
import useUser from "../hooks/useUser";
import useLists from "../hooks/useFetchLists";
import { ListWrapper } from "../styled/ListWrapper";
import ListCard from "../components/ListCard";
import LoadingScreen from "./LoadingScreen";
import {
  ArrowRightOnRectangleIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { FolderArrowDownIcon } from "react-native-heroicons/outline";
import Popup from "../components/Popup";
import useUpdateLists from "../hooks/useUpdateLists";

const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

const Home = () => {
  const { handleLogOut } = useUser();
  const { userLists, error } = useLists();
  const { createList, changeList } = useUpdateLists();
  const theme = useTheme();
  const [listName, setListName] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  function renderList() {
    return userLists?.map((item, index) => {
      return (
        (
          <ListCard
            key={item.name + index}
            id={item.id}
            name={item.name}
            creator={item.creator}
            onEdit={() => {
              setEditId(item.id);
              setEditName(item.name);
              setNewUserEmail("");
              setShowEdit(true);
            }}
          />
        ) ?? null
      );
    });
  }

  if (!error && !userLists) {
    return <LoadingScreen />;
  }

  return (
    <ScreenWrapper horizontalCenter>
      <SafeArea>
        <Header justifyBetween>
          <HeaderTitle>Your Lists</HeaderTitle>
          <View>
            <LogoutButton style={{ marginBottom: 4 }} onPress={handleLogOut}>
              <ArrowRightOnRectangleIcon size={24} color={theme.colors.text} />
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
              <PlusSmallIcon color="#E7F6F2" size={24} fontWeight={800} />
            </Button>
          </InputWrapper>
        </NewListWrapper>
      </SafeArea>
      <Popup showModal={showEdit} setShowModal={() => setShowEdit(false)}>
        <HeaderInput value={editName} onChangeText={setEditName} />
        <LabelWrapper>
          <UsersIcon
            size={16}
            color={theme.colors.gray}
            style={{ marginTop: 1, marginRight: 4 }}
          />
          <Label>Add new users</Label>
        </LabelWrapper>
        <LabelWrapper></LabelWrapper>
        <Input
          autoCapitalize="none"
          value={newUserEmail}
          onChangeText={setNewUserEmail}
        />
        <ListWrapper></ListWrapper>
        {/* TODO add delete List button */}
        <SubmitButton
          onPress={async () => {
            const success = await changeList(editName, editId);
            success && setShowEdit(false);
          }}
        >
          <FolderArrowDownIcon
            style={{ marginRight: 6 }}
            color="#E7F6F2"
            size={20}
          />

          <MyText>Save</MyText>
        </SubmitButton>
      </Popup>
    </ScreenWrapper>
  );
};

const HeaderInput = styled.TextInput`
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 24px;
  width: 100%;
`;

const SubmitButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.blue};
  padding: 8px;
  border-radius: 4px;
  width: 90px;
`;

const LogoutButton = styled.TouchableOpacity`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 100px;
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
  padding: 0 16px 32px 16px;
  width: 100%;
  justify-items: center;
  position: absolute;
  bottom: 0;
`;

export default Home;
