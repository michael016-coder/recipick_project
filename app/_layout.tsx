import {
  CedarvilleCursive_400Regular,
  useFonts,
} from "@expo-google-fonts/cedarville-cursive";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    CedarvilleCursive_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
        <ThemeProvider value={colorScheme === 'white' ? DarkTheme : DefaultTheme}>
          <Stack>         
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar 
            style="auto"       // light, dark, auto 모드 지정
            translucent={false}        // Android 전용 투명 설정
          />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
