import GoogleSignInButton from "@/components/GoogleSignInButton";
import { showToastError } from "@/lib/react-native-toast";
import { supabase } from "@/lib/supabase";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Login attempt:", { error, data });

    if (error) {
      showToastError("Erro ao fazer login: " + error.message);
      return { success: false, message: error.message };
    }

    return { success: true, data };
  };
  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-2xl font-bold mb-4">Bem vindo</Text>
        {/* Formulario login */}
        <View className="w-3/4 mb-6">
          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Senha</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="mt-4 bg-blue-500 rounded-lg px-4 py-2"
          >
            <Text className="text-white text-center font-semibold">Login</Text>
          </TouchableOpacity>
        </View>

        {/* Botão login google */}
        <Link href="/">
          <GoogleSignInButton />
        </Link>
      </View>
    </>
  );
}
