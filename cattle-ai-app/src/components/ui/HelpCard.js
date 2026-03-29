import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { translations } from "../../constants/translations";

export default function HelpCard({ language = "en" }) {

  const t = translations[language] ?? translations["en"];

  const steps = [t.helpStep1, t.helpStep2, t.helpStep3];

  return (
    <LinearGradient
      colors={["#f1f8e9", "#e8f5e9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.titleRow}>
        <Text style={styles.titleIcon}>📖</Text>
        <Text style={styles.title}>{t.helpTitle}</Text>
      </View>

      <View style={styles.divider} />

      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 22,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  titleIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  title: {
    fontWeight: "800",
    fontSize: 18,
    color: "#1b5e20",
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(46,125,50,0.15)",
    marginBottom: 14,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  stepBadge: {
    backgroundColor: "#2e7d32",
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
  },
  stepText: {
    color: "#33691e",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
});