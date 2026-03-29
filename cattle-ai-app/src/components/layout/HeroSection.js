import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { translations } from "../../constants/translations";

export default function HeroBanner({ language = "en" }) {

  const t = translations[language] ?? translations["en"];

  const stats = [
    { number: "50+", label: t.statBreeds,   icon: "🐄" },
    { number: "3",   label: t.statDiseases, icon: "🦠" },
    { number: "AI",  label: t.statPowered,  icon: "⚡" },
  ];

  return (
    <LinearGradient
      colors={["#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {/* ── Top badge ── */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>🤖 AI Powered</Text>
      </View>

      {/* ── Title ── */}
      <Text style={styles.title}>{t.heroTitle}</Text>
      <Text style={styles.subtitle}>{t.heroSubtitle}</Text>

      {/* ── Divider ── */}
      <View style={styles.divider} />

      {/* ── Stats ── */}
      <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statNumber}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 28,
    marginBottom: 22,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  badgeText: {
    color: "#2e7d32",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: {
    color: "#1b5e20",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.3,
    lineHeight: 34,
  },
  subtitle: {
    color: "#33691e",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: "center",
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  statNumber: {
    color: "#1b5e20",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statLabel: {
    color: "#33691e",
    fontSize: 11,
    marginTop: 3,
    fontWeight: "500",
    textAlign: "center",
  },
});