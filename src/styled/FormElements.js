import styled from "styled-components";
import { MyText } from "./MyText";

export const FormCheckboxWrapper = styled.View`
    margin-top: 16px;
    margin-bottom: 16px;
`;
export const FormButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.blue};
    padding: 16px;
    border-radius: 4px;
`;

export const FormText = styled(MyText)`
    text-align: center;
    width: 100%;
    font-size: 16px;
`;

export const FormTitle = styled(MyText)`
    font-size: 40px;
    margin-bottom: 24px;
`;

export const FormLink = styled(MyText)`
    margin-bottom: 16px;
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.text};
`;

const formWidth = 280;

export const InputGroup = styled.KeyboardAvoidingView`
    width: ${formWidth}px;
`;

export const FormButtonGroup = styled.View`
    width: ${formWidth}px;
`;
