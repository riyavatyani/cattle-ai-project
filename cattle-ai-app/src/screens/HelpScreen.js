import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../constants/translations";

export default function HelpScreen() {

  const { language } = useLanguage();
  const t = translations[language] ?? translations["en"];

  const steps = [
    { icon: "📱", title: t.helpStep1, desc: t.helpStep1Desc },
    { icon: "📸", title: t.helpStep2, desc: t.helpStep2Desc },
    { icon: "🤖", title: t.helpStep3, desc: t.helpStep3Desc },
    { icon: "📊", title: t.helpStep4, desc: t.helpStep4Desc },
  ];

  const tips = [t.tip1, t.tip2, t.tip3];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* ── Header ── */}
      <LinearGradient
        colors={["#c8e6c9", "#a5d6a7", "#81c784"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerIcon}>📖</Text>
        <Text style={styles.headerTitle}>{t.helpTitle}</Text>
        <Text style={styles.headerSub}>{t.helpSubtitle}</Text>
      </LinearGradient>

      {/* ── Steps ── */}
      <Text style={styles.sectionLabel}>{t.stepsTitle}</Text>

      {steps.map((step, index) => (
        <View key={index} style={styles.stepCard}>
          <View style={styles.stepLeft}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
          </View>
          <View style={styles.stepIcon}>
            <Text style={styles.stepIconText}>{step.icon}</Text>
          </View>
          <View style={styles.stepRight}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDesc}>{step.desc}</Text>
          </View>
        </View>
      ))}

      {/* ── Tips ── */}
      <Text style={styles.sectionLabel}>{t.tipsTitle}</Text>

      <View style={styles.tipsCard}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipRow}>
            <Text style={styles.tipDot}>💡</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f8e9",
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcon: {
    fontSize: 44,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1b5e20",
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 13,
    color: "#33691e",
    marginTop: 6,
    textAlign: "center",
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 20,
    letterSpacing: 0.3,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dcedc8",
    elevation: 2,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  stepLeft: {
    marginRight: 10,
  },
  stepBadge: {
    backgroundColor: "#43a047",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    color: "white",
    fontWeight: "800",
    fontSize: 13,
  },
  stepIcon: {
    backgroundColor: "#f1f8e9",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  stepIconText: {
    fontSize: 22,
  },
  stepRight: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: 3,
  },
  stepDesc: {
    fontSize: 12,
    color: "#6a8f6a",
    lineHeight: 17,
  },
  tipsCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#dcedc8",
    elevation: 2,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  tipDot: {
    fontSize: 15,
    marginRight: 10,
    marginTop: 1,
  },
  tipText: {
    fontSize: 13,
    color: "#33691e",
    flex: 1,
    lineHeight: 19,
    fontWeight: "500",
  },
});