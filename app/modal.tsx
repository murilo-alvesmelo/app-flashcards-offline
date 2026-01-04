import { useAuth } from "@/context/auth-provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  console.log(user);
  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View className="flex-row justify-between items-center px-6 py-4 border-b border-zinc-100">
        <Text className="text-2xl font-bold text-zinc-900">Profile</Text>
        <TouchableOpacity onPress={handleClose} className="p-2">
          <Ionicons name="close" size={28} color="#3f3f46" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center pt-10 px-6">
        <View className="mb-6 shadow-xl shadow-black/20">
          <Image
            source={{ uri: user?.user_metadata.avatar_url }}
            className="w-32 h-32 rounded-full grayscale"
            resizeMode="cover"
          />
        </View>

        <Text className="text-3xl font-extrabold text-zinc-900 text-center mb-1">
          {user?.user_metadata.full_name}
        </Text>

        <View className="flex-row w-full border border-zinc-200 rounded-lg overflow-hidden mb-10">
          <TouchableOpacity className="flex-1 py-4 border-r border-zinc-200 items-center active:bg-zinc-50">
            <Text className="text-zinc-800 font-semibold">E-mail</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 py-4 items-center active:bg-zinc-50">
            <Text className="text-zinc-800 font-semibold">{user?.email}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="mt-auto mb-10 border border-red-500 rounded-lg px-6 py-3 active:bg-red-50 w-full items-center"
        >
          <Text className="text-red-500 font-medium text-lg">
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
