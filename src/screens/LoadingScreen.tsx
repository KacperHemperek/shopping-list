import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import { useTheme } from "styled-components";

const LoadingScreen = () => {
    const theme = useTheme();

    return (
        <ScreenWrapper verticalCenter horizontalCenter>
            <ActivityIndicator color={theme.colors.lightBlue} size="large" />
        </ScreenWrapper>
    );
};

export default LoadingScreen;
