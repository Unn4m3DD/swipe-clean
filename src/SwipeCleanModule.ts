import { NativeModule, requireNativeModule } from "expo";

declare class SwipeCleanModule extends NativeModule {
  uninstall(bundleId: string): string;
  getInstalledApps(): Promise<any>;
}

export default requireNativeModule<SwipeCleanModule>("SwipeClean");
