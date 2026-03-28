import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HeroBanner() {
  return (
    <LinearGradient
      colors={["#1b5e20", "#2e7d32", "#43a047", "#66bb6a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <Text style={styles.title}>🐄 Cattle AI Scanner</Text>

      <Text style={styles.subtitle}>
        Detect cattle breed & diseases instantly using AI
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Breeds</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Diseases</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>AI</Text>
          <Text style={styles.statLabel}>Powered</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 26,
    paddingHorizontal: 22,
    borderRadius: 22,
    marginBottom: 22,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    elevation: 6
  },

  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.5
  },

  subtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
    fontSize: 15,
    lineHeight: 20
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22
  },

  statCard: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    minWidth: 80
  },

  statNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "700"
  },

  statLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9
  }
});