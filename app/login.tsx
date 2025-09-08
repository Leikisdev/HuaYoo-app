import { View, Text, Button, TextInput } from "react-native";
import { signInWithEmailAndPassword, getAuth } from "@react-native-firebase/auth";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);

      
    } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }
    
        if (err.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
    }
  };

  return (
    <View style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    }}
    >
      <Text>Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} />
      <Button title="Login" onPress={() => handleLogin(email, password)} />
    </View>
  );
}