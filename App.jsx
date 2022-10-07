import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Home from "./src/screens/Home";
import List from "./src/screens/List";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
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
    return (
        <NavigationContainer>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </NavigationContainer>
    );
};

const Stack = createNativeStackNavigator();

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
            {session ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {/* <Stack.Screen name="Home" component={Home} /> */}
                    <Stack.Screen name="List" component={List} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LogIn" component={Login} />
                    <Stack.Screen name="SignUp" component={Signup} />
                </Stack.Navigator>
            )}
        </AppWrapper>
    );
}
