import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import styled from "styled-components";
import { Input } from "../styled/Input";
import { MyText } from "../styled/MyText";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Login = () => {
    const [email, setEmail] = useState("");

    const [showPassword, setShowPassword] = useState(null);

    const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : null}
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <Title>Log In</Title>
            <Input keyboardType="" placeholder="email" />
            <Input
                keyboardType="default"
                secureTextEntry={!showPassword}
                placeholder="password"
            />
            <CheckboxWrapper>
                <BouncyCheckbox
                    isChecked={showPassword}
                    onPress={() => setShowPassword((prev) => !prev)}
                    text="show password"
                    disableText={false}
                    textStyle={{
                        color: "#E7F6F2",
                        textDecorationLine: "none",
                    }}
                    fillColor="#395B64"
                    innerIconStyle={{
                        borderRadius: 4,
                    }}
                    iconStyle={{
                        borderRadius: 4,
                    }}
                />
            </CheckboxWrapper>
            <CustomButton>
                <StyledText>Log In</StyledText>
            </CustomButton>
        </KeyboardAvoidingView>
    );
};

const CheckboxWrapper = styled.View`
    margin-bottom: 20px;
`;

const CustomButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.blue};
    padding: 16px;
    border-radius: 4px;
`;

const StyledText = styled(MyText)`
    text-align: center;
    width: 100%;
    font-size: 16px;
`;

const Title = styled(MyText)`
    font-size: 28px;
    margin-bottom: 20px;
`;
export default Login;
