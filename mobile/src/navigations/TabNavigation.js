import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomeScreen";
import History from "../screens/HistoryScreen";
import Profile from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ focused }) => <Icon name="home" color={focused ? "red" : "grey"} size={20} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "History",
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ focused }) => <Icon name="podium" color={focused ? "red" : "grey"} size={20} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ focused }) => <Icon name="person" color={focused ? "red" : "grey"} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
