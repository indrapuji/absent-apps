import React, { Fragment, useEffect, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePass from "./src/screens/ChangePassScreen";
import Login from "./src/screens/LoginScreen";
import SplashScreen from "./src/screens/SplashScreen";
import Checkin from "./src/screens/CheckinScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./src/components/Context";

import TabNavigation from "./src/navigations/TabNavigation";

const Stack = createNativeStackNavigator();

const App = ({ navigation }) => {
  const isLogin = AsyncStorage.getItem("userToken");

  useEffect(() => {
    checkToken();
  }, [isLogin]);

  const checkToken = async () => {
    let getToken = await AsyncStorage.getItem("userToken");
  };

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userRole: null,
    userName: null,
    userStatus: null,
    userEvent: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          userName: action.name,
          userToken: action.token,
          userRole: action.role,
          userStatus: action.status,
          userEvent: action.event,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.name,
          userToken: action.token,
          userRole: action.role,
          userStatus: action.status,
          userEvent: action.event,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          userRole: null,
          userStatus: null,
          userEvent: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (userToken, userRole, userName, userStatus, userEvent) => {
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userName", userName);
          await AsyncStorage.setItem("userRole", userRole);
          await AsyncStorage.setItem("userEvent", userEvent);
          await AsyncStorage.setItem("userStatus", JSON.stringify(userStatus));
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          token: userToken,
          name: userName,
          role: userRole,
          status: userStatus,
          event: userEvent,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userNama");
          await AsyncStorage.removeItem("userRole");
          await AsyncStorage.removeItem("userEvent");
          await AsyncStorage.removeItem("userStatus");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userName = await AsyncStorage.getItem("userName");
        userRole = await AsyncStorage.getItem("userRole");
        userStatus = await AsyncStorage.getItem("userStatus");
        userEvent = await AsyncStorage.getItem("userEvent");
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: "RETRIVE_TOKEN",
        token: userToken,
        name: userName,
        role: userRole,
        status: userStatus,
        event: userEvent,
      });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          headerMode="screen"
          screenOptions={{
            headerTintColor: "black",
            headerStyle: { backgroundColor: "#e3fdfd" },
          }}
        >
          {loginState.userToken === null && loginState.userStatus !== true ? (
            <>
              <Stack.Screen name="Login" component={Login} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="ChangePass" component={ChangePass} options={{ title: null, headerShown: false }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Discover" component={TabNavigation} options={{ title: null, headerShown: false }} />
              <Stack.Screen name="Checkin" component={Checkin} options={{ title: null, headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
