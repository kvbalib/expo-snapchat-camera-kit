import * as React from 'react';

import { ExpoSnapchatCameraKitViewProps } from './ExpoSnapchatCameraKit.types';

export default function ExpoSnapchatCameraKitView(props: ExpoSnapchatCameraKitViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
