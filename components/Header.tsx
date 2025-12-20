import { useAuth } from "@/context/auth-provider";
import React from "react";
import { Image, View } from "react-native";
import { MonoText } from "./StyledText";

export default function HeaderProfile() {
  const { user } = useAuth();
  console.log("User data in HeaderProfile:", user?.user_metadata);
  return (
    <View className="flex-row justify-between items-center p-4">
      <MonoText className="text-2xl font-bold text-center">
        Olá, {user?.user_metadata.full_name}
      </MonoText>
      {user?.user_metadata.avatar_url && (
        <Image
          source={{ uri: user.user_metadata.avatar_url }}
          style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 12 }}
        />
      )}
    </View>
  );
}
