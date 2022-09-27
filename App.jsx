import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import Login from "./src/screens/Login";
import { MyText } from "./src/styled/MyText";
import { supabase } from "./supabaseClient";

const theme = {
    colors: {
        darkBlue: "#2C3333",
        blue: "#395B64",
        lightBlue: "#A5C9CA",
        text: "#E7F6F2",
    },
};

const AppWrapper = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default function App() {
    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AppWrapper>
            <Wrapper>
                {session ? (
                    <MyText>
                        <TouchableOpacity>Log Out</TouchableOpacity>
                    </MyText>
                ) : (
                    <Login />
                )}
            </Wrapper>
        </AppWrapper>
    );
}

const Wrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkBlue};
`;
