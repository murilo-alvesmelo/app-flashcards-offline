import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

interface Props {
  onPress: () => void;
}

export function AddCardButton({ onPress }: Props) {
  return (
    <Pressable
      className="w-[46%] aspect-square m-2 rounded-2xl border-2 border-zinc-800 p-4 justify-center items-center border-dashed bg-zinc-50 border-zinc-400"
      onPress={onPress}
    >
      <Ionicons name="add" size={48} color="#52525b" />
    </Pressable>
  );
}
