import styled from "styled-components";

export const ScreenWrapper = styled.ScrollView.attrs((props) => ({
    contentContainerStyle: {
        flex: 1,
        alignItems: props.horizontalCenter && "center",
        justifyContent: props.verticalCenter && "center",
        backgroundColor: props.theme.colors.darkBlue,
    },
}))``;
