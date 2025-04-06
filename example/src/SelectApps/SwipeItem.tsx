import { Dimensions, Image, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AppType } from "swipe-clean/SwipeCleanModule";

import { Text } from "../components/Text";
const { width } = Dimensions.get("window");

export default function SwipeItem({
  app,
  onSwipe,
}: {
  app: AppType;
  onSwipe: (result: "KEEP" | "DELETE") => void;
}) {
  const current = useSharedValue<"NEUTRAL" | "KEEP" | "DELETE">("NEUTRAL");
  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange((event) => {
      offset.value = event.translationX;
      current.value = event.translationX > width / 2 ? "KEEP" : "DELETE";
    })
    .onFinalize(() => {
      if (offset.value > width / 2) {
        runOnJS(onSwipe)("KEEP");
      } else if (offset.value < -width / 2) {
        runOnJS(onSwipe)("DELETE");
      }
      current.value = "NEUTRAL";
      offset.value = withSpring(0);
    });
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
      {
        rotate: `${interpolate(
          offset.value,
          [-width, 0, width],
          [-Math.PI / 4, 0, Math.PI / 4],
        )}rad`,
      },
    ],
    borderColor: interpolateColor(
      offset.value,
      [-width / 2, 0, width / 2],
      ["#ef4444", "#d1d5db", "#22c55e"],
    ),
  }));
  return (
    <View className="h-2/3 w-full p-8">
      <GestureDetector gesture={pan}>
        <Animated.View
          className="h-full w-full border-green-500 border items-center justify-center gap-4 rounded-lg bg-white"
          style={animatedStyles}
          key={app.packageName}
        >
          <Image
            source={{ uri: `data:image/png;base64,${app.icon}` }}
            style={{ width: 50, height: 50 }}
          />
          <Text className="text-center text-lg font-semibold">{app.name}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
