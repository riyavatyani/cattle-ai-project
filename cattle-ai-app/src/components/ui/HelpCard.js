import { View, Text, StyleSheet } from "react-native";

export default function HelpCard() {

  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        📖 How to Use
      </Text>

      <Text style={styles.text}>
        1. Tap Scan Cow
      </Text>

      <Text style={styles.text}>
        2. Capture clear image
      </Text>

      <Text style={styles.text}>
        3. AI will detect breed & disease
      </Text>

    </View>
  );

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    elevation: 3
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10
  },
  text: {
    color: "gray",
    marginVertical: 3
  }
});