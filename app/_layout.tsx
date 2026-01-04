import { SplashScreenController } from "@/components/SplashScreenController";
import { AuthProvider, useAuth } from "@/context/auth-provider";
import { migrateDb } from "@/database/database";
import { supabase } from "@/lib/supabase";
import { Toasts } from "@backpackapp-io/react-native-toast";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <AuthProvider>
            <SQLiteProvider databaseName="flashcards.db" onInit={migrateDb}>
              <QueryClientProvider client={queryClient}>
                <SplashScreenController />
                <MainLayout />
                <Toasts />
              </QueryClientProvider>
            </SQLiteProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function MainLayout() {
  const { setAuth } = useAuth();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user);
        router.replace("/(tabs)/home");
        return;
      }
      setAuth(null);
      router.replace("/login");
    });
  }, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="login" />
    </Stack>
  );
}
