import { NativeModule, requireNativeModule } from 'expo';

import { SwipeCleanModuleEvents } from './SwipeClean.types';

declare class SwipeCleanModule extends NativeModule<SwipeCleanModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<SwipeCleanModule>('SwipeClean');
