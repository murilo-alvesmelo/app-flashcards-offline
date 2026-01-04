import { MonoText } from "@/components/StyledText";
import { Flashcard } from "@/database/database";
import React, { useEffect, useState } from "react";
import { Alert, Modal, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { id?: number; front: string; back: string }) => void;
  onDelete: (id: number) => void;
  initialData?: Flashcard | null;
}

export function FlashcardFormModal({
  visible,
  onClose,
  onSave,
  onDelete,
  initialData,
}: Props) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    if (visible) {
      setFront(initialData?.front || "");
      setBack(initialData?.back || "");
    }
  }, [visible, initialData]);

  const handleSave = () => {
    if (!front.trim() || !back.trim()) return;
    onSave({ id: initialData?.id, front, back });
    onClose();
  };

  const handleDelete = () => {
    if (initialData?.id) {
      Alert.alert("Apagar", "Tem certeza?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            onDelete(initialData.id);
            onClose();
          },
        },
      ]);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className="flex-1 bg-black/60 justify-center items-center p-4">
        <View className="w-full bg-white rounded-3xl p-6 shadow-2xl">
          <MonoText className="text-2xl font-bold text-center mb-6 text-zinc-800">
            {initialData ? "Editar Card" : "Novo Card"}
          </MonoText>

          <MonoText className="text-sm font-bold text-zinc-500 mb-2 uppercase">
            Frente
          </MonoText>
          <TextInput
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-lg mb-4 h-24 text-top"
            value={front}
            onChangeText={setFront}
            multiline
            placeholder="Pergunta..."
          />

          <MonoText className="text-sm font-bold text-zinc-500 mb-2 uppercase">
            Verso
          </MonoText>
          <TextInput
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-lg mb-6 h-24 text-top"
            value={back}
            onChangeText={setBack}
            multiline
            placeholder="Resposta..."
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-zinc-200 p-4 rounded-xl items-center"
            >
              <MonoText className="font-bold text-zinc-700 text-lg">
                Cancelar
              </MonoText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-zinc-900 p-4 rounded-xl items-center"
            >
              <MonoText className="font-bold text-lg text-white">
                Salvar
              </MonoText>
            </TouchableOpacity>
          </View>

          {initialData && (
            <TouchableOpacity
              onPress={handleDelete}
              className="mt-4 p-2 items-center"
            >
              <MonoText className="text-red-500 font-semibold text-base">
                Excluir Card
              </MonoText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
