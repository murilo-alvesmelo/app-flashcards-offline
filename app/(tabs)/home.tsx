import HeaderProfile from "@/components/Header";
import { MonoText } from "@/components/StyledText";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddCardButton } from "@/components/AddCardButton";
import { FlashcardCard } from "@/components/FlashcardCard";
import { FlashcardDetailModal } from "@/components/Flashcards/FlashcardDetailModal";
import { FlashcardFormModal } from "@/components/Flashcards/FlashcardFormModal";
import { Flashcard } from "@/database/database";
import { useFlashcards } from "@/hooks/useFlashcards";
import { generateRandomColor } from "@/utils/generateRandomColor";

export default function GridScreen() {
  const {
    flashcards,
    isLoading,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
  } = useFlashcards();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Flashcard | null>(null);
  const [initialCarouselIndex, setInitialCarouselIndex] = useState(0); // NOVO ESTADO

  // --- Handlers de Abertura ---

  const handleOpenAdd = () => {
    setSelectedCard(null);
    setIsFormVisible(true);
  };

  const handleOpenEdit = (item: Flashcard) => {
    setSelectedCard(item);
    setIsFormVisible(true);
  };

  const handleOpenDetail = (item: Flashcard) => {
    if (flashcards) {
      const index = flashcards.findIndex((card) => card.id === item.id);
      if (index !== -1) {
        setInitialCarouselIndex(index);
        setIsDetailVisible(true);
      }
    }
  };

  // --- Handlers de Ação ---

  const handleSaveForm = (data: {
    id?: number;
    front: string;
    back: string;
  }) => {
    if (data.id) {
      updateFlashcard({ id: data.id, front: data.front, back: data.back });
    } else {
      addFlashcard({
        front: data.front,
        back: data.back,
        color: generateRandomColor(),
      });
    }
    setIsFormVisible(false);
  };

  // --- Renderização da Lista ---

  const listData = [
    ...(flashcards || []),
    { id: "ADD_BUTTON_ID", isAddButton: true },
  ];

  const renderItem = ({ item }: { item: any }) => {
    if (item.isAddButton) {
      return <AddCardButton onPress={handleOpenAdd} />;
    }
    return (
      <FlashcardCard
        item={item}
        onPress={handleOpenDetail}
        onLongPress={handleOpenEdit}
      />
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView className=" bg-purple-500" />
      <HeaderProfile />
      <MonoText className="text-3xl font-extrabold text-zinc-800 p-4">
        Meus Cards
      </MonoText>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />

      {/* Modal de Formulário (Adicionar/Editar) */}
      <FlashcardFormModal
        visible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        onSave={handleSaveForm}
        onDelete={deleteFlashcard}
        initialData={selectedCard}
      />

      {/* Modal de Detalhes (Carrossel) */}
      <FlashcardDetailModal
        visible={isDetailVisible}
        onClose={() => setIsDetailVisible(false)}
        flashcards={flashcards}
        initialIndex={initialCarouselIndex}
      />
    </>
  );
}
