import { toast } from "@backpackapp-io/react-native-toast";

export function showToastError(message: string) {
  return toast(message, {
    duration: 4000,
  });
}
