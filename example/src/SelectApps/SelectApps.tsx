import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SwipeCleanModule from "swipe-clean/SwipeCleanModule";

import SwipeItem from "./SwipeItem";
import { AppType } from "../../../types";
import { Button } from "../components/Button";
import { Text } from "../components/Text";

export default function SelectApps({
  onFinish,
  filter,
  reset,
}: {
  onFinish: (result: { app: AppType; result: "KEEP" | "DELETE" }[]) => void;
  filter: string;
  reset: () => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getInstalledApps", filter],
    queryFn: async () => {
      return (await SwipeCleanModule.getInstalledApps()).filter((app) =>
        app.packageName.includes(filter),
      );
    },
  });
  const [currentResult, setCurrentResult] = useState<
    {
      app: AppType;
      result: "KEEP" | "DELETE";
    }[]
  >([]);
  useEffect(() => {
    if (currentResult.length === data?.length) {
      onFinish(currentResult);
    }
  }, [data, onFinish, currentResult]);
  return (
    <>
      {isLoading && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="flex flex-col h-full items-center justify-center gap-2 bg-background"
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
          className="flex flex-col gap-8 pt-16 h-full bg-background"
        >
          <Text className="text-center text-xl font-bold">
            Filtering {currentResult.length} of {data.length}
          </Text>
          <View className="relative h-2/3">
            {data
              .slice(
                currentResult.length,
                Math.min(data.length, currentResult.length + 2),
              )
              .reverse()
              .map((app, i) => (
                <SwipeItem
                  key={app.packageName}
                  app={app}
                  onSwipe={(result: "KEEP" | "DELETE") => {
                    setCurrentResult((prev) => {
                      return prev.concat({
                        app,
                        result,
                      });
                    });
                  }}
                />
              ))}
          </View>

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
                reset();
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
