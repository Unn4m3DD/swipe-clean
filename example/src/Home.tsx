import { useState } from "react";
import { AppType } from "swipe-clean/SwipeCleanModule";

import SelectApps from "./SelectApps/SelectApps";
import Uninstaller from "./Uninstaller";
export default function Home() {
  const [result, setResult] = useState<
    {
      app: AppType;
      result: "KEEP" | "DELETE";
    }[]
  >();

  if (!result) {
    return <SelectApps onFinish={(result) => setResult(result)} />;
  } else {
    return (
      <Uninstaller
        reset={() => setResult(undefined)}
        toUninstall={result.filter((e) => e.result === "DELETE")}
      />
    );
  }
}
