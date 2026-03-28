import { View, Text, StyleSheet } from "react-native";

export default function HelpScreen() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>How to Use</Text>

      <Text style={styles.text}>
        1. Open Scan tab
      </Text>

      <Text style={styles.text}>
        2. Capture cow image
      </Text>

      <Text style={styles.text}>
        3. AI detects breed and disease
      </Text>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    marginBottom: 10
  }
});