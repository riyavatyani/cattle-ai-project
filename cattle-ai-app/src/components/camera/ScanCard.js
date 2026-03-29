import { View, Text, StyleSheet, Pressable } from "react-native";
import { translations } from "../../constants/translations";

export default function ScanCard({ onScanPress, onUploadPress, language = "en" }) {

  const t = translations[language] ?? translations["en"];

  return (
    <View style={styles.card}>

      <Text style={styles.icon}>📷</Text>
      <Text style={styles.title}>{t.scanTitle}</Text>
      <Text style={styles.subtitle}>{t.scanSubtitle}</Text>

      <Pressable style={styles.scanButton} onPress={onScanPress}>
        <Text style={styles.buttonText}>{t.startScan}</Text>
      </Pressable>

      <Pressable style={styles.uploadButton} onPress={onUploadPress}>
        <Text style={styles.uploadText}>{t.uploadImage}</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dcedc8",
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  icon: {
    fontSize: 38,
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 5,
  },
  subtitle: {
    color: "#6a8f6a",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  scanButton: {
    backgroundColor: "#43a047",
    paddingVertical: 13,
    paddingHorizontal: 36,
    borderRadius: 12,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#a5d6a7",
    width: "100%",
    alignItems: "center",
  },
  uploadText: {
    color: "#2e7d32",
    fontWeight: "700",
    fontSize: 15,
  },
});