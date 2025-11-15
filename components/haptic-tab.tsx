import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        // iOS와 Android 모두 햅틱 혹은 진동 피드백 제공
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        } else if (Platform.OS === 'android') {
          // Android의 경우 진동 강도가 다소 강하므로 Medium 정도로 설정
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        // 원래 onPressIn 이벤트 유지
        props.onPressIn?.(ev);
      }}
    />
  );
}
