import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoSnapchatCameraKit.web.ts
// and on native platforms to ExpoSnapchatCameraKit.ts
import {
  ChangeEventPayload,
  ExpoSnapchatCameraKitViewProps,
} from "./ExpoSnapchatCameraKit.types";
import ExpoSnapchatCameraKitModule from "./ExpoSnapchatCameraKitModule";
import ExpoSnapchatCameraKitView from "./ExpoSnapchatCameraKitView";

// Get the native constant value.
export const PI = ExpoSnapchatCameraKitModule.PI;

export function getSnapchatKitAppID(): string {
  return ExpoSnapchatCameraKitModule.getSnapchatKitAppID();
}

export function getSnapchatApiToken(): string {
  return ExpoSnapchatCameraKitModule.getSnapchatApiToken();
}

export function getSnapchatLensGroupID(): string {
  return ExpoSnapchatCameraKitModule.getSnapchatLensGroupID();
}

export async function setValueAsync(value: string) {
  return await ExpoSnapchatCameraKitModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  ExpoSnapchatCameraKitModule ?? NativeModulesProxy.ExpoSnapchatCameraKit
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export {
  ExpoSnapchatCameraKitView,
  ExpoSnapchatCameraKitViewProps,
  ChangeEventPayload,
};
