import { useCallback, useState } from "react";

import Filter from "./Filter";
import Finished from "./Finished";
import SelectApps from "./SelectApps/SelectApps";
import Uninstaller from "./Uninstaller";
import { AppType } from "../../types";
export default function Home() {
  const [isFinished, setIsFinished] = useState(false);
  const [filter, setFilter] = useState<string>();
  const [result, setResult] = useState<
    {
      app: AppType;
      result: "KEEP" | "DELETE";
    }[]
  >();
  const reset = useCallback(() => {
    setFilter(undefined);
    setResult(undefined);
    setIsFinished(false);
  }, []);
  if (filter === undefined) {
    return <Filter setFilter={setFilter} />;
  } else if (!result) {
    return (
      <SelectApps
        reset={reset}
        filter={filter}
        onFinish={(result) => setResult(result)}
      />
    );
  } else if (!isFinished) {
    return (
      <Uninstaller
        reset={() => {
          setFilter(undefined);
          setResult(undefined);
        }}
        toUninstall={result.filter((e) => e.result === "DELETE")}
        setIsFinished={setIsFinished}
      />
    );
  } else {
    return <Finished reset={reset} />;
  }
}
