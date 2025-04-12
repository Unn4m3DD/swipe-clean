import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
} from "react-native-reanimated";
import SwipeCleanModule from "swipe-clean/SwipeCleanModule";

import { Button } from "./components/Button";
import { Text } from "./components/Text";
import { AppType } from "../../types";

export default function Uninstaller({
  toUninstall,
  reset,
  setIsFinished,
}: {
  toUninstall: {
    app: AppType;
    result: "KEEP" | "DELETE";
  }[];
  reset: () => void;
  setIsFinished: (value: boolean) => void;
}) {
  return (
    <Animated.View
      className="flex flex-col gap-8 pt-16 h-full bg-background"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text className="text-center text-xl font-bold">
        Uninstalling {toUninstall.length} apps
      </Text>
      <ScrollView
        className="h-2/3 w-full"
        contentContainerClassName="gap-4 p-8"
      >
        {toUninstall.map((app, i) => (
          <Animated.View
            key={i}
            className="flex flex-row gap-4 items-center"
            entering={SlideInLeft.delay(i * 50)}
          >
            <Image
              source={{ uri: `data:image/png;base64,${app.app.icon}` }}
              style={{ width: 50, height: 50 }}
            />
            <Text className="text-center text-lg font-semibold">
              {app.app.name}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      <View className="flex flex-row gap-8 justify-center p-8">
        <Button
          variant="default"
          onPress={() => {
            reset();
          }}
        >
          <Text>Cancel</Text>
        </Button>
        <Button
          variant="destructive"
          onPress={() => {
            for (const app of toUninstall) {
              SwipeCleanModule.uninstall(app.app.packageName);
            }
            setIsFinished(true);
          }}
        >
          <Text>Confirm Uninstall</Text>
        </Button>
      </View>
    </Animated.View>
  );
}
