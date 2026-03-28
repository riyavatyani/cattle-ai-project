import { Pressable, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 200
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});