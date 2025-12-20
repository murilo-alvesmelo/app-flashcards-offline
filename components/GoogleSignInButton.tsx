import { supabase } from "@/lib/supabase";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const extractParamsFromUrl = (url: string) => {
    const params: { [key: string]: string } = {};
    const regex = /[?&#]([^=#]+)=([^&#]*)/g;
    let match;
    while ((match = regex.exec(url))) {
      params[match[1]] = decodeURIComponent(match[2]);
    }

    return {
      access_token: params.access_token,
      refresh_token: params.refresh_token,
      error: params.error,
      error_description: params.error_description,
    };
  };

  async function onSignInButtonPress() {
    try {
      const redirectUrl = Linking.createURL("/google-auth");
      console.log("Redirect URL:", redirectUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No URL returned from Supabase");

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUrl
      );

      if (result.type === "success" && result.url) {
        const params = extractParamsFromUrl(result.url);

        if (params.error) {
          throw new Error(params.error_description || params.error);
        }

        if (params.access_token && params.refresh_token) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          });

          if (sessionError) throw sessionError;

          console.log("Login com Google realizado com sucesso!");
        } else {
          throw new Error("Tokens não encontrados na URL de retorno.");
        }
      }
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      if (err.message !== "User cancelled the auth session") {
        Alert.alert(
          "Erro no Login",
          err.message || "Ocorreu um erro inesperado."
        );
      }
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={onSignInButtonPress}
      style={{
        width: 300,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#dbdbdb",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: "https://developers.google.com/identity/images/g-logo.png",
        }}
        style={{ width: 20, height: 20, marginRight: 12 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 16,
          color: "#1f2937",
          fontWeight: "600",
        }}
      >
        Continuar com Google
      </Text>
    </TouchableOpacity>
  );
}
