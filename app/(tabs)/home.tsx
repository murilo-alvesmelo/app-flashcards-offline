import HeaderProfile from "@/components/Header";
import { MonoText } from "@/components/StyledText";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons"; // Icones para o botão + e lixeira
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addFlashcard,
  deleteFlashcard,
  Flashcard,
  getFlashcards,
  updateFlashcard,
} from "../../database/database";

export default function GridScreen() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  // Estados
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // --- React Query Logic ---
  const { data: flashcards, isLoading } = useQuery({
    queryKey: ["flashcards"],
    queryFn: () => getFlashcards(db),
  });

  const addMutation = useMutation({
    mutationFn: async () => await addFlashcard(db, front, back),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (currentId) await updateFlashcard(db, currentId, front, back);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await deleteFlashcard(db, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      closeModal();
    },
  });

  // --- Handlers ---
  const openAddModal = () => {
    setCurrentId(null);
    setFront("");
    setBack("");
    setModalVisible(true);
  };

  const openEditModal = (item: Flashcard) => {
    setCurrentId(item.id);
    setFront(item.front);
    setBack(item.back);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = () => {
    if (!front.trim() || !back.trim()) return;
    currentId ? updateMutation.mutate() : addMutation.mutate();
  };

  const handleDelete = () => {
    if (currentId) {
      Alert.alert("Apagar", "Tem certeza?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => deleteMutation.mutate(currentId),
        },
      ]);
    }
  };

  // --- Lista Combinada ---
  const listData = [
    ...(flashcards || []),
    { id: "ADD_BUTTON_ID", isAddButton: true },
  ];

  const renderItem = ({ item }: { item: any }) => {
    const baseCardStyle =
      "w-[46%] aspect-square m-2 rounded-2xl border-2 border-zinc-800 p-4 justify-between";

    if (item.isAddButton) {
      return (
        <Pressable
          className={`${baseCardStyle} items-center justify-center border-dashed bg-zinc-50 border-zinc-400`}
          onPressIn={openAddModal}
        >
          <Ionicons name="add" size={48} color="#52525b" />
        </Pressable>
      );
    }

    // 2. Card Normal
    return (
      <TouchableOpacity
        className={`${baseCardStyle} bg-white shadow-sm`}
        onPress={() => console.log("Card pressed")}
        onLongPress={() => openEditModal(item)}
      >
        <Text
          className="text-lg font-bold text-zinc-800 leading-tight"
          numberOfLines={3}
        >
          {item.front}
        </Text>
        <Text className="text-xs text-zinc-500 font-medium">
          Ver resposta...
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Erro ao deslogar: " + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 pt-10">
      <HeaderProfile />
      <MonoText className="text-xl font-extrabold ml-5 mb-4 text-zinc-800">
        Meus Cards
      </MonoText>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View className="flex-1 bg-black/60 justify-center items-center p-4">
          <View className="w-full bg-white rounded-3xl p-6 shadow-2xl">
            <Text className="text-2xl font-bold text-center mb-6 text-zinc-800">
              {currentId ? "Editar Card" : "Novo Card"}
            </Text>

            <Text className="text-sm font-bold text-zinc-500 mb-2 uppercase">
              Frente (Pergunta)
            </Text>
            <TextInput
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-lg mb-4 h-24 text-top"
              value={front}
              onChangeText={setFront}
              multiline
              placeholder="Digite a pergunta aqui..."
            />

            <Text className="text-sm font-bold text-zinc-500 mb-2 uppercase">
              Verso (Resposta)
            </Text>
            <TextInput
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-lg mb-6 h-24 text-top"
              value={back}
              onChangeText={setBack}
              multiline
              placeholder="Digite a resposta aqui..."
            />

            {/* Botões de Ação */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={closeModal}
                className="flex-1 bg-zinc-200 p-4 rounded-xl items-center"
              >
                <Text className="font-bold text-zinc-700 text-lg">
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                className="flex-1 bg-zinc-900 p-4 rounded-xl items-center"
              >
                <Text className="font-bold text-white text-lg">Salvar</Text>
              </TouchableOpacity>
            </View>

            {currentId && (
              <TouchableOpacity
                onPress={handleDelete}
                className="mt-4 p-2 items-center"
              >
                <Text className="text-red-500 font-semibold text-base">
                  Excluir Card
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
