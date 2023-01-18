import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./screens/SettingsScreen";
import Home from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Liczenie" component={Home} />
			<Stack.Screen name="Ustawienia" component={Settings} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
