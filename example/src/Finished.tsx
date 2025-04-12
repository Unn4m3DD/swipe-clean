import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Button } from "./components/Button";
import { Text } from "./components/Text";

export default function Finished({ reset }: { reset: () => void }) {
  return (
    <Animated.View
      className="flex flex-col gap-8 items-center justify-center h-full bg-background"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text className="text-center text-xl font-bold">
        Apps uninstalled successfully
      </Text>

      <Button
        variant="outline"
        onPress={() => {
          reset();
        }}
      >
        <Text>Restart</Text>
      </Button>
    </Animated.View>
  );
}
