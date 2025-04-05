import { Stack } from 'expo-router';

export default function _layout() {


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Entry Page' }} />
      <Stack.Screen name='camera' options={{title: "cameraPage"}}/>
    </Stack>
  );
}
