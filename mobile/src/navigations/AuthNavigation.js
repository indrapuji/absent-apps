import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/LoginScreen";
import ChangePass from "../screens/ChangePassScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="screen">
      <Stack.Screen name="Login" component={Login} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="ChangePass" component={ChangePass} options={{ title: null, headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
