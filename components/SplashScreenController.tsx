import { useAuth } from "@/context/auth-provider";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { user } = useAuth();

  if (!user) {
    SplashScreen.hideAsync();
  }

  return null;
}
