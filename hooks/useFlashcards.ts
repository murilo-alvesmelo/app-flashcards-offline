import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import {
  addFlashcard,
  deleteFlashcard,
  getFlashcards,
  updateFlashcard,
} from "../database/database";

export function useFlashcards() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  const { data: flashcards, isLoading } = useQuery({
    queryKey: ["flashcards"],
    queryFn: () => getFlashcards(db),
  });

  const addMutation = useMutation({
    mutationFn: async (data: { front: string; back: string; color?: string }) =>
      await addFlashcard(db, data.front, data.back, data.color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; front: string; back: string }) =>
      await updateFlashcard(db, data.id, data.front, data.back),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await deleteFlashcard(db, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });

  return {
    flashcards,
    isLoading,
    addFlashcard: addMutation.mutate,
    updateFlashcard: updateMutation.mutate,
    deleteFlashcard: deleteMutation.mutate,
  };
}
