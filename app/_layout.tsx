import { Stack } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    // Optional loading screen while Firebase checks session
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
    <Stack>
      {!user ? (
        // If not authenticated → force user to login
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="home" options={{ title: "Home" }} />
          <Stack.Screen name="profile" options={{ title: "Profile" }} />
        </>
      )}
    </Stack>
  );
}