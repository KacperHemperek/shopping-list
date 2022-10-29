import { View, Text } from "react-native";
import React from "react";
import { InviteState } from "../interface/InviteState";

interface UserItemType {
  name: string;
  email: string;
  status: InviteState;
}

const UserItem = ({ name, email, status }: UserItemType) => {
  return (
    <View>
      <Text>UserItem</Text>
    </View>
  );
};

export default UserItem;
