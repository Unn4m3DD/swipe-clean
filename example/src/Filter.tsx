import { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Text } from "./components/Text";

export default function Filter({
  setFilter,
}: {
  setFilter: (filter: string) => void;
}) {
  const [internalFilter, setInternalFilter] = useState<string>();
  return (
    <Animated.View
      className="flex flex-col gap-8 pb-16 h-full items-center justify-center"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text className="text-center text-xl font-bold">
        Set a package filter to list apps
      </Text>
      <Input
        className="w-2/3"
        placeholder="com.example.app"
        onChangeText={(text) => {
          setInternalFilter(text.toLowerCase());
        }}
        value={internalFilter}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button
        onPress={() => {
          setFilter(internalFilter ?? "");
        }}
      >
        <Text>Next</Text>
      </Button>
    </Animated.View>
  );
}
