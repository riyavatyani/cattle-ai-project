import { Pressable, Text, StyleSheet } from "react-native";

export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});