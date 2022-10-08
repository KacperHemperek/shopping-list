import { View, Text } from "react-native";
import React from "react";
import { MyText } from "../styled/MyText";

const ListCard = ({ name }) => {
    return (
        <View>
            <MyText>{name}</MyText>
        </View>
    );
};

export default ListCard;
