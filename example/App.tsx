import * as ExpoSnapchatCameraKit from "expo-snapchat-camera-kit";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoSnapchatCameraKit.getSnapchatKitAppID()}</Text>
      <Text>{ExpoSnapchatCameraKit.getSnapchatApiToken()}</Text>
      <Text>{ExpoSnapchatCameraKit.getSnapchatLensGroupID()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
