import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
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
