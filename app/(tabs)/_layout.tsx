import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

//개발 중 추가
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="fridge"
      screenOptions={{
        tabBarActiveTintColor: '#0095F6', // Instagram blue
        tabBarInactiveTintColor: '#000000', // Black
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
      }}>
        
      <Tabs.Screen
        name="fridge"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="fridge-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather
              name="search"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookMark"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather
              name="bookmark"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
    
  );
}


/*

| 옵션명                              | 역할                 | 예시                                        |
| -------------------------------- | ------------------ | ----------------------------------------- |
| **`headerShown`**                | 상단 헤더바 표시 여부       | `false` → 숨김                              |
| **`tabBarActiveTintColor`**      | 활성 탭 아이콘/라벨 색      | `'#007AFF'`                               |
| **`tabBarInactiveTintColor`**    | 비활성 탭 색상           | `'#999'`                                  |
| **`tabBarStyle`**                | 하단 탭바 전체 스타일       | `{ backgroundColor: '#fff', height: 60 }` |
| **`tabBarLabelStyle`**           | 탭 텍스트 스타일          | `{ fontSize: 12, fontWeight: '600' }`     |
| **`tabBarIconStyle`**            | 아이콘 스타일            | `{ marginBottom: -4 }`                    |
| **`tabBarShowLabel`**            | 라벨 표시 여부           | `false` → 아이콘만 표시                         |
| **`tabBarButton`**               | 커스텀 버튼 컴포넌트 지정     | `HapticTab` 등                             |
| **`tabBarHideOnKeyboard`**       | 키보드 올라올 때 탭바 자동 숨김 | `true`                                    |
| **`tabBarBackground`**           | 탭바 배경 컴포넌트         | `<BlurView />` (iOS 스타일)                  |
| **`tabBarItemStyle`**            | 각 탭 버튼 영역 스타일      | `{ paddingVertical: 5 }`                  |
| **`tabBarVisible` (deprecated)** | 예전 버전: 탭 표시 여부     | 대신 `display: 'none'` 사용                   |

*/