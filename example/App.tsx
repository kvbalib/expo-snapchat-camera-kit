import { StyleSheet, Text, View } from 'react-native';

import * as ExpoSnapchatCameraKit from 'expo-snapchat-camera-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoSnapchatCameraKit.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
