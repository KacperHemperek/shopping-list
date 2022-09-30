import styled from "styled-components";

export const ScreenWrapper = styled.View`
    flex: 1;
    align-items: ${({ horizontalCenter }) =>
        horizontalCenter ? "center" : "start"};
    background-color: ${({ theme }) => theme.colors.darkBlue};
    justify-content: center;
`;

export const Lol = styled.ScrollView.attrs((props) => ({
    contentContainerStyle: {
        flex: 1,
        alignItems: props.horizontalCenter ? "center" : "start",
        justifyContent: props.verticalCenter ? "center" : "start",
        backgroundColor: props.theme.colors.darkBlue,
    },
}))``;
