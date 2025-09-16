import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

import LoginScreen from './login';
import HomeScreen from './index';

const Stack = createStackNavigator();

function RootNavigator() {
  const { user, loading } = useAuth();

  console.log('RootNavigator: Auth state', { user: !!user, loading });

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}