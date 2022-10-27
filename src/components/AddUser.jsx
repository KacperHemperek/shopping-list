import React, { useState, useTransition } from "react";
import { Input } from "../styled/Input";
import styled, { useTheme } from "styled-components";
import { supabase } from "../../supabaseClient";
import { MyText } from "../styled/MyText";
import { UserPlusIcon } from "react-native-heroicons/solid";

const AddUser = (listId) => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();

  function handleSearch(e) {
    setNewUserEmail(e);
    if (!e) {
      setSearchResults(null);
    }
    startTransition(async () => {
      if (!e) return;
      try {
        const { data, error: searchError } = await supabase
          .from("profiles")
          .select("*")
          .like("email", `%${e}%`)
          .limit(10);

        setSearchResults(data);

        if (searchError) {
          console.error(searchError);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  function inviteUser() {
    //
  }

  function renderSugestedUsers() {
    return searchResults?.map((result) => (
      <UserItem key={result.id}>
        <MyText>{result.email}</MyText>
        <UserPlusIcon
          color={theme.colors.text}
          size={20}
          onPress={inviteUser}
        />
      </UserItem>
    ));
  }

  return (
    <AddUserWrapper>
      <Input
        autoCapitalize="none"
        value={newUserEmail}
        onChangeText={handleSearch}
      />
      {searchResults?.length > 0 && newUserEmail && !isPending ? (
        <>
          <UsersList>{renderSugestedUsers()}</UsersList>
        </>
      ) : null}
    </AddUserWrapper>
  );
};

const AddUserWrapper = styled.View`
  position: relative;
  z-index: 50;
`;

const UsersList = styled.View`
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  top: 50px;
  width: 100%;
  border-radius: 12px;
`;

const UserItem = styled.View`
  flex-direction: row;
  padding: 8px;
  justify-content: space-between;
`;

export default AddUser;
