import { View, Text, Button, TextInput, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, auth, updateProfile } from "@/services/auth/firebase";
import { useRouter } from "expo-router";
import { createUser } from "@/services/api/orchestrator";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !displayName) {
      Alert.alert("Error", "Please enter email, password and nick name");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      // Create user
      await createUserWithEmailAndPassword(email, password);
      // Set user nickname
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });

      console.log("Account created successfully!");
      await createUser({ email: email, displayName: displayName});
    } catch (err: any) {
      console.log("Sign up error:", err);
      let errorMessage = "Account creation failed. Please try again.";
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } 
      
      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an accout</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize="none"
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? "Signing Up..." : "Sign Up"}
          onPress={handleSignUp}
          disabled={isLoading}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title={"Cancel"}
          onPress={() => router.navigate("/(auth)/login")}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
});