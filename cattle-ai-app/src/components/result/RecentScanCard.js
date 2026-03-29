import { View, Text, StyleSheet } from "react-native";
import { translations } from "../../constants/translations";

export default function RecentScanCard({ breed, disease, confidence, language = "en" }) {

  const t = translations[language] ?? translations["en"];
  const isHealthy = disease?.toLowerCase() === "healthy";

  return (
    <View style={styles.card}>

      <View style={styles.left}>
        <Text style={styles.cowIcon}>🐄</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.breed}>{breed}</Text>
        <Text style={[styles.disease, isHealthy ? styles.healthy : styles.sick]}>
          {isHealthy ? `✅ ${t.healthy}` : `⚠️ ${disease}`}
        </Text>
      </View>

      {confidence && (
        <View style={styles.right}>
          <Text style={styles.confidence}>{confidence}%</Text>
          <Text style={styles.confLabel}>{t.confidence}</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginVertical: 6,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  left: {
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cowIcon: { fontSize: 26 },
  middle: { flex: 1 },
  breed: {
    fontWeight: "800",
    fontSize: 16,
    color: "#1b5e20",
    marginBottom: 4,
  },
  disease: { fontSize: 13, fontWeight: "600" },
  healthy: { color: "#2e7d32" },
  sick: { color: "#c62828" },
  right: { alignItems: "center" },
  confidence: {
    fontWeight: "800",
    fontSize: 18,
    color: "#2e7d32",
  },
  confLabel: {
    fontSize: 10,
    color: "gray",
    marginTop: 2,
  },
});