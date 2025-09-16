import { View, Text, Button, TextInput, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../utils/firebaseAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(email, password);
      console.log("Login successful!");
    } catch (err: any) {
      console.log("Login error:", err);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = "Invalid login credentials. Please check your email and password.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      Alert.alert("Login Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(email, password);
      console.log("Account created successfully!");
    } catch (err: any) {
      console.log("Sign up error:", err);
      
      let errorMessage = "Account creation failed. Please try again.";
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? "Signing In..." : "Sign In"}
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? "Creating Account..." : "Create Account"}
          onPress={handleSignUp}
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