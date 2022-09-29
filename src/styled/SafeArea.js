import { Platform, StatusBar } from "react-native";
import styled, { css } from "styled-components";

export const SafeArea = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    ${Platform.OS === "android" &&
    css`
        padding-top: ${StatusBar.currentHeight}px;
    `};
`;
