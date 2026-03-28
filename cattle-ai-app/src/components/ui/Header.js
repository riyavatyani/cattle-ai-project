import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐄 Cattle AI Scanner</Text>
      <Text style={styles.subtitle}>
        Breed & Disease Detection using AI
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2e7d32"
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 5
  }
});