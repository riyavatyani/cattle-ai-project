import { View, Text, StyleSheet } from "react-native";

export default function FeatureGrid() {

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.icon}>🐄</Text>
        <Text style={styles.text}>Breed Detection</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>🦠</Text>
        <Text style={styles.text}>Disease Detection</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>📊</Text>
        <Text style={styles.text}>AI Confidence</Text>
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
    elevation: 3
  },
  icon: {
    fontSize: 28
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5
  }
});