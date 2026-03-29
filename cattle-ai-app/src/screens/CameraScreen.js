import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { resizeImage } from "../services/imageProcessor";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../constants/translations";

export default function CameraScreen({ navigation }) {

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language] ?? translations["en"];

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionIcon}>📷</Text>
        <Text style={styles.permissionTitle}>{t.cameraPermissionTitle}</Text>
        <Text style={styles.permissionSub}>{t.cameraPermissionSub}</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>{t.grantPermission}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Save scan to AsyncStorage ──
  const saveScan = async (result) => {
    try {
      const newScan = {
        breed: result.breed,
        disease: result.disease,
        confidence: result.disease_confidence,
        date: new Date().toLocaleDateString(),
      };
      const existing = await AsyncStorage.getItem("recentScans");
      const existingScans = existing ? JSON.parse(existing) : [];
      const updated = [newScan, ...existingScans].slice(0, 5);
      await AsyncStorage.setItem("recentScans", JSON.stringify(updated));
      console.log("SCAN SAVED:", newScan);
    } catch (e) {
      console.log("Failed to save scan:", e);
    }
  };

  const sendToBackend = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append("image", { uri: imageUri, name: "cow.jpg", type: "image/jpeg" });

      const response = await axios.post(
        "http://192.168.29.73:5000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("API RESPONSE:", response.data);

      // ✅ Save before navigating
      await saveScan(response.data);

      navigation.replace("Result", {
        image: imageUri,
        result: response.data,
      });

    } catch (error) {
      console.log("API ERROR:", error);
      alert("Prediction failed");
      navigation.replace("Result", {
        image: imageUri,
        result: null,
      });
    }
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    const resizedImage = await resizeImage(photo.uri);
    navigation.navigate("Result", { image: resizedImage });
    sendToBackend(resizedImage);
  };

  const uploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
      });
      if (result.canceled) return;
      const imageUri = result.assets[0].uri;
      const resizedImage = await resizeImage(imageUri);
      navigation.navigate("Result", { image: imageUri });
      sendToBackend(imageUri);
    } catch (error) {
      console.log("Image picker error:", error);
    }
  };

  return (
    <View style={styles.container}>

      <CameraView style={styles.camera} ref={cameraRef} />

      {/* ── Overlay top bar ── */}
      <View style={styles.topOverlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>{t.cameraTitle}</Text>
      </View>

      {/* ── Scan frame ── */}
      <View style={styles.frameWrapper}>
        <View style={styles.frame}>
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />
        </View>
        <Text style={styles.frameHint}>{t.frameHint}</Text>
      </View>

      {/* ── Bottom controls ── */}
      <View style={styles.bottomBar}>

        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.uploadIcon}>🖼️</Text>
          <Text style={styles.uploadText}>{t.uploadImage}</Text>
        </TouchableOpacity>

        <Pressable style={styles.captureButton} onPress={takePhoto}>
          <View style={styles.captureInner} />
        </Pressable>

        <View style={styles.placeholder} />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },

  // Permission screen
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f8e9",
    padding: 30,
  },
  permissionIcon: { fontSize: 60, marginBottom: 16 },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 8,
  },
  permissionSub: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
  },
  permissionButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  // Top overlay
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backButton: { marginRight: 12 },
  backText: { color: "white", fontSize: 15, fontWeight: "600" },
  topTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // Scan frame
  frameWrapper: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 260,
    height: 260,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#4caf50",
    borderWidth: 3,
  },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  frameHint: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 16,
    fontSize: 13,
    fontWeight: "500",
  },

  // Bottom bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "white",
  },
  uploadButton: {
    alignItems: "center",
  },
  uploadIcon: { fontSize: 28 },
  uploadText: {
    color: "white",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },
  placeholder: { width: 60 },
});