import styled from "styled-components";
import { MyText } from "./MyText";

export const Input = styled.TextInput`
    background-color: white;
    border-radius: 4px;
    padding: 12px 16px;
    max-width: 100%;
    font-size: 16px;
    margin-bottom: 16px;
`;

export const Label = styled(MyText)`
    font-weight: 300;
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 8px;
`;

export const LabelWrapper = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;
