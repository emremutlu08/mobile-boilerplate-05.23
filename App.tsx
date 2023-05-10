import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
// import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import store from "./src/store";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Get this from a backend server
const EXPO_GOOGLE_CLIENT_ID = "";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  console.log(EXPO_GOOGLE_CLIENT_ID, "EXPO_GOOGLE_CLIENT_ID");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_GOOGLE_CLIENT_ID,
  });

  console.log(request, response, "request, response");

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("user");

    if (!user) {
      if (
        response?.type === "success" &&
        response?.authentication?.accessToken
      ) {
        await getUserInfo(response?.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>{JSON.stringify(userInfo)}</Text>
        <Text>Hello Emre!</Text>
        <Button title="Sign in with Google" onPress={() => promptAsync()} />
        <Button
          title="Delete Local Storage"
          onPress={() => AsyncStorage.removeItem("@user")}
        />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
