import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Switch,
    View,
} from "react-native";
import { Input } from "../styled/Input";
const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;

const Login = () => {
    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <Input keyboardType="" placeholder="email" />
            <Input
                keyboardType="default"
                secureTextEntry={true}
                placeholder="password"
            />
            <Input
                keyboardType="default"
                secureTextEntry={true}
                placeholder="password"
            />
        </KeyboardAvoidingView>
    );
};

export default Login;
