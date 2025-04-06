import { requireNativeView } from 'expo';
import * as React from 'react';

import { SwipeCleanViewProps } from './SwipeClean.types';

const NativeView: React.ComponentType<SwipeCleanViewProps> =
  requireNativeView('SwipeClean');

export default function SwipeCleanView(props: SwipeCleanViewProps) {
  return <NativeView {...props} />;
}
