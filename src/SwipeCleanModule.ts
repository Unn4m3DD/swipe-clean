import { NativeModule, requireNativeModule } from "expo";

declare class SwipeCleanModule extends NativeModule {
  uninstall(bundleId: string): string;
  getInstalledApps(): Promise<
    {
      name: string;
      packageName: string;
      icon: string;
    }[]
  >;
}

export default requireNativeModule<SwipeCleanModule>("SwipeClean");
