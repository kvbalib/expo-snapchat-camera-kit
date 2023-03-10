### *** WORK IN PROGRESS ***

# expo-snapchat-camera-kit

Snapchat Camera Kit integration for Expo managed apps.

# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/snapchat-camera-kit.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/snapchat-camera-kit/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/versions/latest/introduction/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

Add config plugin to your app.json file.

```json
{
  "expo": {
    ...
    "plugins": ["expo-snapchat-camera-kit",
      {
        "snapchatKitAppID": "<SNAPCHAT_KIT_APP_ID>",
        "snapchatApiToken":  "<SNAPCHAT_API_TOKEN>",
        "snapchatLensGroupID": "<SNAPCHAT_LENS_GROUP_ID>",
        "cameraKitVersion": "<CAMERA_KIT_VERSION>"
      }
    ]
  }
}
```
Run `npx expo prebuild --clean` after installing the npm package and adding config plugin.


# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-snapchat-camera-kit
```

### Configure for iOS

### Configure for Android

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
