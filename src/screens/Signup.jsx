import React, { useState } from "react";
import { Alert, Platform, View } from "react-native";
import { Input } from "../styled/Input";
import { supabase } from "../../supabaseClient";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import {
    FormButton,
    FormButtonGroup,
    FormCheckboxWrapper,
    FormLink,
    FormText,
    FormTitle,
    FormWrapper,
    InputGroup,
} from "../styled/FormElements";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "../components/Checkbox";
import { signUp } from "../helpers/Auth";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [name, setName] = useState("");

    const [showPassword, setShowPassword] = useState(null);

    const navigation = useNavigation();

    async function handleLogIn() {
        try {
            await signUp(email, password, confirm, name);
        } catch (error) {
            Alert.alert(
                error.name,
                error.message.replace("AuthApiError: ", "")
            );
            setPassword("");
            setConfirm("");
        }
    }

    const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;
    return (
        <ScreenWrapper verticalCenter horizontalCenter>
            <InputGroup
                behavior={Platform.OS === "ios" ? "position" : ""}
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <FormTitle>Sign Up</FormTitle>
                <Input
                    keyboardType="email-address"
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    keyboardType="email-address"
                    placeholder="username"
                    value={name}
                    onChangeText={setName}
                />

                <Input
                    keyboardType="default"
                    secureTextEntry={!showPassword}
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    keyboardType="default"
                    secureTextEntry={!showPassword}
                    placeholder="confirm password"
                    value={confirm}
                    onChangeText={setConfirm}
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
                <FormLink onPress={() => navigation.navigate("LogIn")}>
                    Already have an account? Log in!
                </FormLink>
                <FormButton onPress={handleLogIn}>
                    <FormText>Sign Up</FormText>
                </FormButton>
            </FormButtonGroup>
        </ScreenWrapper>
    );
};

export default Signup;
