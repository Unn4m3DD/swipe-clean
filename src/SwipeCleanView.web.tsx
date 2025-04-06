import * as React from 'react';

import { SwipeCleanViewProps } from './SwipeClean.types';

export default function SwipeCleanView(props: SwipeCleanViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
