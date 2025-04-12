import { NativeModule, requireNativeModule } from "expo";

import type { AppType } from "../types";

declare class SwipeCleanModule extends NativeModule {
  uninstall(bundleId: string): string;
  getInstalledApps(): Promise<AppType[]>;
}

export default requireNativeModule<SwipeCleanModule>("SwipeClean");
