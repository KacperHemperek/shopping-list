import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MyText } from "../styled/MyText";
import { useNavigation } from "@react-navigation/native";

const ListCard = ({ name, id }) => {
    const navigation = useNavigation();

    function redirectToList() {
        console.log(id);
        navigation.navigate("List", { listId: id });
    }

    return (
        <TouchableOpacity onPress={redirectToList}>
            <MyText>{name}</MyText>
        </TouchableOpacity>
    );
};

export default ListCard;
