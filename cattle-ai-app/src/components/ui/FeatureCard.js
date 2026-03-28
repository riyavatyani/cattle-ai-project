import { View, Text, StyleSheet } from "react-native";

export default function FeatureCard({ title, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  desc: {
    color: "gray"
  }
});