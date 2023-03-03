import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import { ExpoSnapchatCameraKitViewProps } from "./ExpoSnapchatCameraKit.types";

const NativeView: React.ComponentType<ExpoSnapchatCameraKitViewProps> =
  requireNativeViewManager("ExpoSnapchatCameraKit");

export default function ExpoSnapchatCameraKitView(
  props: ExpoSnapchatCameraKitViewProps
) {
  return <NativeView {...props} />;
}
