import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View className="h-full w-full">
        <GestureHandlerRootView className="h-full w-full">
          <Home />
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}
