import { useAuth } from "@/context/auth-provider";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { MonoText } from "./StyledText";

export default function HeaderProfile() {
  const { user } = useAuth();
  const handleProfilePress = () => {
    router.push("/modal");
  };
  return (
    <View className="flex-row justify-between items-center p-4 bg-purple-500 rounded-b-2xl">
      <MonoText className="text-xl font-bold text-center">
        Olá{`, ${user?.user_metadata.full_name}`} 👋
      </MonoText>
      {user?.user_metadata.avatar_url && (
        <Pressable onPress={handleProfilePress}>
          <Image
            source={{ uri: user.user_metadata.avatar_url }}
            style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 12 }}
          />
        </Pressable>
      )}
    </View>
  );
}
