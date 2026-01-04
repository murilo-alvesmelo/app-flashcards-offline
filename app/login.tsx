import GoogleSignInButton from "@/components/GoogleSignInButton";
import LogoSvg from "@/components/LogoSvg";
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
        <LogoSvg />
        <Text className="text-2xl font-bold mb-4">Bem vindo ao Flashcards</Text>
        <View className="w-3/4 gap-4">
          <View>
            <Text className="text-sm font-semibold mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-3"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View>
            <Text className="text-sm font-semibold mb-2">Senha</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-3"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            className=" bg-blue-400 rounded-lg px-4 py-3"
          >
            <Text className="text-white text-center font-semibold">Login</Text>
          </TouchableOpacity>
          <Text className="text-center text-gray-500 my-2">ou</Text>

          <Link href="/">
            <GoogleSignInButton />
          </Link>
        </View>
      </View>
    </>
  );
}
