import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components/native";
import CurrentUserProvider from "./src/components/CurrentUserProvider";
import useUser from "./src/hooks/useUser";
import Home from "./src/screens/Home";
import List from "./src/screens/List";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";

const theme: DefaultTheme = {
  colors: {
    darkBlue: "#2C3333",
    blue: "#395B64",
    lightBlue: "#A5C9CA",
    text: "#E7F6F2",
    gray: "#707c7c",
    red: "#d32f2f",
    green: "#307351",
    yellow: "#F4A259",
    lightGreen: "#2BC016",
    lightRed: "#F21B3F ",
  },
};
const Stack = createNativeStackNavigator();

const AppContent = () => {
  const currentUser = useUser();

  return currentUser?.session ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="List" component={List} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <CurrentUserProvider>
          <AppContent />
        </CurrentUserProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
