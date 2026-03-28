import { View, Pressable, Text, StyleSheet } from "react-native";

export default function LanguageToggle({ language, setLanguage }) {

  return (
    <View style={styles.container}>

      <Pressable
        style={[styles.btn, language === "en" && styles.active]}
        onPress={() => setLanguage("en")}
      >
        <Text style={styles.text}>EN</Text>
      </Pressable>

      <Pressable
        style={[styles.btn, language === "hi" && styles.active]}
        onPress={() => setLanguage("hi")}
      >
        <Text style={styles.text}>हिंदी</Text>
      </Pressable>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd"
  },
  active: {
    backgroundColor: "#2e7d32"
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
});