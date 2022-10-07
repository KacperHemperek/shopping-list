import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import Checkbox from "../components/Checkbox";
import { logIn } from "../helpers/Auth";
import {
    FormButton,
    FormButtonGroup,
    FormCheckboxWrapper,
    FormLink,
    FormText,
    FormTitle,
    InputGroup,
} from "../styled/FormElements";
import { Input } from "../styled/Input";
import { ScreenWrapper } from "../styled/ScreenWrapper";

const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation();

    async function handleLogIn() {
        try {
            await logIn(email, password);
        } catch (error) {
            Alert.alert(
                error.name,
                String(error.message).replace("AuthApiError: ", "")
            );
            setPassword("");
        }
    }

    return (
        <ScreenWrapper verticalCenter horizontalCenter>
            <InputGroup
                behavior={Platform.OS === "ios" ? "position" : null}
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <FormTitle>Log In</FormTitle>
                <Input
                    keyboardType="email-address"
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    keyboardType="default"
                    secureTextEntry={!showPassword}
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                />
                <FormCheckboxWrapper>
                    <Checkbox
                        checked={showPassword}
                        setChecked={() => setShowPassword((prev) => !prev)}
                        label="show password"
                    />
                </FormCheckboxWrapper>
            </InputGroup>
            <FormButtonGroup>
                <FormLink
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}
                >
                    Don't have an account? Sign Up
                </FormLink>

                <FormButton onPress={handleLogIn}>
                    <FormText>Log In</FormText>
                </FormButton>
            </FormButtonGroup>
        </ScreenWrapper>
    );
};

export default Login;
