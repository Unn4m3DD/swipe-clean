import { registerWebModule, NativeModule } from 'expo';

import { SwipeCleanModuleEvents } from './SwipeClean.types';

class SwipeCleanModule extends NativeModule<SwipeCleanModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(SwipeCleanModule);
