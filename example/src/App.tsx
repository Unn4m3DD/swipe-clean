import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Home from "./Home";
const queryClient = new QueryClient();
export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

function App() {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "black" : "white"}
      />
      <View className="h-full w-full bg-background">
        <GestureHandlerRootView className="h-full w-full">
          <Home />
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}
