import styled from "styled-components";

export const ScreenWrapper = styled.View`
    flex: 1;
    align-items: ${({ horizontalCenter }) =>
        horizontalCenter ? "center" : "flex-start"};
    background-color: ${({ theme }) => theme.colors.darkBlue};
    justify-content: ${({ verticalCenter }) =>
        verticalCenter ? "center" : "flex-start"};
`;
