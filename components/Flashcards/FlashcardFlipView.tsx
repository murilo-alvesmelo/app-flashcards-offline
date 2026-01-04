import { MonoText } from "@/components/StyledText";
import { Flashcard } from "@/database/database";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

interface FlashcardFlipViewProps {
  item: Flashcard;
}

export function FlashcardFlipView({ item }: FlashcardFlipViewProps) {
  const [showFront, setShowFront] = useState(true);

  const toggleFlip = () => setShowFront(!showFront);

  return (
    <TouchableOpacity
      className="flex-1 rounded-2xl border-2 border-zinc-800 p-6 bg-white shadow-lg mx-2 justify-center items-center"
      onPress={toggleFlip}
      activeOpacity={0.8}
      style={{ minHeight: 200 }}
    >
      {showFront ? (
        <MonoText className="text-3xl font-bold text-center text-zinc-800">
          {item.front}
        </MonoText>
      ) : (
        <MonoText className="text-xl text-center text-zinc-700">
          {item.back}
        </MonoText>
      )}
      <MonoText className="absolute bottom-4 right-4 text-xs text-zinc-500 italic">
        Toque para {showFront ? "ver o verso" : "ver a frente"}
      </MonoText>
    </TouchableOpacity>
  );
}
