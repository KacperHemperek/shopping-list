import React, { useState, useTransition } from "react";
import { Input } from "../styled/Input";
import styled from "styled-components";
import { supabase } from "../../supabaseClient";
import { MyText } from "../styled/MyText";

const AddUser = () => {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e) {
    console.log(e);
    setNewUserEmail(e);
    startTransition(async () => {
      try {
        const { data, error: searchError } = await supabase
          .from("profiles")
          .select("*")
          .like("email", `%${e}%`);
        console;
        setSearchResults(data);
        if (searchError) {
          console.error(searchError);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <AddUserWrapper>
      <Input
        autoCapitalize="none"
        value={newUserEmail}
        onChangeText={handleSearch}
      />
      {searchResults && newUserEmail ? (
        <UsersList>
          {searchResults.map((result) => (
            <MyText>{result.email}</MyText>
          ))}
        </UsersList>
      ) : null}
    </AddUserWrapper>
  );
};

const AddUserWrapper = styled.View``;

const UsersList = styled.View``;

export default AddUser;
