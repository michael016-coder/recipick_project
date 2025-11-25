import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DonateScreen() {
  const handleDonate = (amount: string) => {
    Alert.alert(
      "후원하기",
      `${amount}원을 후원하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "후원하기",
          onPress: () => {
            // TODO: 실제 결제 로직 연동
            Alert.alert("감사합니다", "후원해주셔서 감사합니다!");
          },
        },
      ]
    );
  };

  const handleCustomAmount = () => {
    Alert.alert("맞춤 금액", "맞춤 금액 기능은 곧 추가됩니다.");
  };

  const donationAmounts = [
    { id: "1", amount: "1,000", label: "1,000원" },
    { id: "2", amount: "5,000", label: "5,000원" },
    { id: "3", amount: "10,000", label: "10,000원" },
    { id: "4", amount: "50,000", label: "50,000원" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart" size={64} color="#ef4444" />
          </View>
          <Text style={styles.title}>후원하기</Text>
          <Text style={styles.description}>
            ReciPick을 더 좋게 만들어주세요. 여러분의 후원은 앱 개발과
            개선에 큰 도움이 됩니다.
          </Text>

          <View style={styles.amountContainer}>
            {donationAmounts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.amountButton}
                onPress={() => handleDonate(item.amount)}
                activeOpacity={0.7}
              >
                <Text style={styles.amountButtonText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.customAmountButton}
            onPress={handleCustomAmount}
            activeOpacity={0.7}
          >
            <Text style={styles.customAmountButtonText}>맞춤 금액</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#6b7280" />
            <Text style={styles.infoText}>
              후원은 안전한 결제 시스템을 통해 처리됩니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fef2f2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  amountContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  amountButton: {
    width: "48%",
    height: 60,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  customAmountButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0095F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  customAmountButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 12,
  },
  infoText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 8,
    flex: 1,
  },
});

