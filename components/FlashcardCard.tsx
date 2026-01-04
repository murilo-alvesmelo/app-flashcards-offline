import { MonoText } from "@/components/StyledText";
import { Flashcard } from "@/database/database";
import React from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  item: Flashcard;
  onPress: (item: Flashcard) => void;
  onLongPress: (item: Flashcard) => void;
}

export function FlashcardCard({ item, onPress, onLongPress }: Props) {
  return (
    <TouchableOpacity
      className="w-[46%] aspect-square m-2 rounded-xl p-4 justify-between shadow-sm"
      style={{ backgroundColor: item.color || "#FFFFFF" }}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
    >
      <MonoText
        className="text-lg font-bold text-zinc-800 leading-tight "
        numberOfLines={3}
      >
        {item.front}
      </MonoText>
    </TouchableOpacity>
  );
}
