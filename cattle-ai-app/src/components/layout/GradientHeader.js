import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";

export default function GradientHeader() {
  return (
    <LinearGradient
      colors={["#2e7d32", "#66bb6a"]}
      style={styles.header}
    >
      <Text style={styles.title}>🐄 Cattle AI Scanner</Text>
      <Text style={styles.subtitle}>
        Detect Breed & Diseases using AI
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 30,
    borderRadius: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white"
  },
  subtitle: {
    color: "white",
    marginTop: 5
  }
});