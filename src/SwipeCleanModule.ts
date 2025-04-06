import { NativeModule, requireNativeModule } from "expo";
export type AppType = {
  name: string;
  packageName: string;
  icon: string;
};
declare class SwipeCleanModule extends NativeModule {
  uninstall(bundleId: string): string;
  getInstalledApps(): Promise<AppType[]>;
}

export default requireNativeModule<SwipeCleanModule>("SwipeClean");
