import { MonoText } from "@/components/StyledText";
import { Flashcard } from "@/database/database";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Modal, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { FlashcardFlipView } from "./FlashcardFlipView"; // Importe o novo componente

interface FlashcardDetailModalProps {
  visible: boolean;
  flashcards: Flashcard[] | undefined;
  initialIndex: number;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

export function FlashcardDetailModal({
  visible,
  flashcards,
  initialIndex,
  onClose,
}: FlashcardDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const carouselRef = useRef<any>(null); // Tipando o ref

  useEffect(() => {
    if (
      visible &&
      carouselRef.current &&
      flashcards &&
      initialIndex !== currentIndex
    ) {
      carouselRef.current.scrollTo({ index: initialIndex, animated: false });
      setCurrentIndex(initialIndex);
    } else if (
      visible &&
      flashcards &&
      initialIndex === -1 &&
      flashcards.length > 0
    ) {
      carouselRef.current?.scrollTo({ index: 0, animated: false });
      setCurrentIndex(0);
    }
  }, [visible, initialIndex, flashcards]);

  if (!flashcards || flashcards.length === 0) {
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/60 justify-center items-center p-4">
          <View className="w-full bg-white rounded-3xl p-6 shadow-2xl">
            <MonoText className="text-2xl font-bold text-center mb-6 text-zinc-800">
              Nenhum Flashcard
            </MonoText>
            <MonoText className="text-lg text-center text-zinc-700">
              Crie um flashcard para começar!
            </MonoText>
            <TouchableOpacity
              onPress={onClose}
              className="mt-6 bg-zinc-900 p-4 rounded-xl items-center"
            >
              <MonoText className="font-bold text-white text-lg">
                Fechar
              </MonoText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className="flex-1 bg-black/80 justify-center items-center">
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-12 right-5 z-10 p-3 rounded-full bg-white/30"
        >
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>

        <Carousel
          ref={carouselRef}
          loop={false}
          width={screenWidth}
          height={screenWidth * 1.2}
          data={flashcards}
          defaultIndex={initialIndex}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ item }) => <FlashcardFlipView item={item} />}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 40,
            parallaxAdjacentItemScale: 0.75,
          }}
          pagingEnabled={true}
          snapEnabled={true}
        />

        <View className="mt-4 p-2 bg-white/20 rounded-full">
          <MonoText className="text-white font-bold text-lg">
            {currentIndex + 1} / {flashcards.length}
          </MonoText>
        </View>
      </View>
    </Modal>
  );
}
