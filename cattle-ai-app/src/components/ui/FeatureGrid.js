import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { translations } from "../../constants/translations";

export default function FeatureGrid({ language = "en" }) {

  const t = translations[language] ?? translations["en"];

  const features = [
    { icon: "🐄", label: t.featureBreed,    gradient: ["#e8f5e9", "#c8e6c9"] },
    { icon: "🦠", label: t.featureDisease,  gradient: ["#fce4ec", "#f8bbd0"] },
    { icon: "📊", label: t.featureAI,       gradient: ["#e3f2fd", "#bbdefb"] },
  ];

  return (
    <View style={styles.container}>
      {features.map((item, index) => (
        <LinearGradient
          key={index}
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          <Text style={styles.text}>{item.label}</Text>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  card: {
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
    width: "30%",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  iconCircle: {
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 50,
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 26,
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    color: "#2e4a30",
    letterSpacing: 0.3,
  },
});