import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SwipeCleanModule, { AppType } from "swipe-clean/SwipeCleanModule";

import SwipeItem from "./SwipeItem";
import { Button } from "../components/Button";
import { Text } from "../components/Text";

export default function SelectApps({
  onFinish,
}: {
  onFinish: (result: { app: AppType; result: "KEEP" | "DELETE" }[]) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getInstalledApps"],
    queryFn: async () => {
      return (await SwipeCleanModule.getInstalledApps()).filter((e) =>
        e.packageName.includes("gymflow"),
      );
    },
  });
  const [currentResult, setCurrentResult] = useState<
    {
      app: AppType;
      result: "KEEP" | "DELETE";
    }[]
  >([]);

  return (
    <>
      {isLoading && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="flex flex-col h-full items-center justify-center gap-2"
        >
          <Text className="text-center text-xl font-bold">Loading...</Text>
          <ActivityIndicator />
        </Animated.View>
      )}
      {!isLoading && !data && <Text>Error: {error?.message}</Text>}
      {!isLoading && data && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="flex flex-col gap-8 pt-16 h-full"
        >
          <Text className="text-center text-xl font-bold">
            Filtering {currentResult.length} of {data.length}
          </Text>
          <SwipeItem
            app={data[currentResult.length]}
            onSwipe={(result: "KEEP" | "DELETE") => {
              setCurrentResult((prev) => {
                const next = prev.concat({
                  app: data[currentResult.length],
                  result,
                });
                if (next.length === data.length) {
                  onFinish(next);
                }
                return next;
              });
            }}
          />
          <View className="flex flex-row gap-8 justify-center">
            <Button
              variant="default"
              disabled={currentResult.length === 0}
              onPress={() => {
                setCurrentResult((e) => e.slice(0, e.length - 1));
              }}
            >
              <Text>Undo</Text>
            </Button>
            <Button
              onPress={() => {
                setCurrentResult([]);
              }}
            >
              <Text>Reset</Text>
            </Button>
          </View>
        </Animated.View>
      )}
    </>
  );
}
