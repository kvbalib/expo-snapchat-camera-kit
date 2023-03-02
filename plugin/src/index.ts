import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
  withDangerousMod,
  withInfoPlist,
  withAppBuildGradle,
  withGradleProperties,
} from "expo/config-plugins";
import fs from "fs";
import path from "path";

interface ISnapchatConfig {
  snapchatKitAppID: string;
  snapchatApiToken: string;
  snapchatLensGroupID: string;
  cameraKitVersion?: string;
}

const pods = `  pod 'SCSDKCameraKit'
  pod 'SCSDKCameraKitReferenceUI'`;

const defaultCameraKitVersion = "1.20.0";

const withSnapchatApp: ConfigPlugin<ISnapchatConfig> = (
  config,
  { snapchatKitAppID, snapchatApiToken, snapchatLensGroupID, cameraKitVersion }
) => {
  /** iOS **/
  config = withInfoPlist(config, (config) => {
    config.modResults["SCCameraKitClientID"] = snapchatKitAppID;
    config.modResults["SCCameraKitAPIToken"] = snapchatApiToken;
    config.modResults["SCCameraKitLensGroupID"] = snapchatLensGroupID;

    return config;
  });

  config = withDangerousMod(config, [
    "ios",
    async (config) => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      const contents = fs.readFileSync(filePath, "utf-8");

      const addCode = mergeContents({
        tag: "withSnapchatApp",
        src: contents,
        newSrc: pods,
        anchor: /\s*get_default_flags\(\)/i,
        offset: 2,
        comment: "#",
      });

      if (!addCode.didMerge) {
        console.error(
          "ERROR: Cannot add withReactNativeFirebase to the project's ios/Podfile because it's malformed."
        );
        return config;
      }

      fs.writeFileSync(filePath, addCode.contents);

      return config;
    },
  ]);

  /** Android **/
  config = withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "SCCameraKitClientID",
      snapchatKitAppID
    );
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "SCCameraKitAPIToken",
      snapchatApiToken
    );
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "SCCameraKitLensGroupID",
      snapchatLensGroupID
    );

    // if (config.modResults.manifest.application) {
    //   const activities = config.modResults.manifest.application[0].activity;
    //   const queueItActivity = {
    //     $: { "android:name": "com.snap.camerakit:support-camera-activity" },
    //   };
    //
    //   config.modResults.manifest.application[0].activity = [
    //     ...activities!,
    //     queueItActivity,
    //   ];
    // }

    return config;
  });

  config = withGradleProperties(config, (config) => {
    config.modResults.push({
      type: "property",
      key: "cameraKitVersion",
      value: cameraKitVersion ?? defaultCameraKitVersion,
    });

    return config;
  });

  const firebaseMessagingString =
    '    implementation("com.snap.camerakit:support-camera-activity:${cameraKitVersion}")';

  config = withAppBuildGradle(config, (config) => {
    const dependenciesBlockRegex = /(dependencies\s*\{[^\S\r\n]*)/;

    config.modResults.contents = config.modResults.contents.replace(
      dependenciesBlockRegex,
      `$1\n${firebaseMessagingString}\n`
    );

    return config;
  });

  return config;
};

export default withSnapchatApp;
