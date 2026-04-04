import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../config";

export const predict = async (imageUri) => {
  const formData = new FormData();
  // ✅ FastAPI uses: file: UploadFile = File(...) → field name MUST be "file"
  formData.append("file", {
    uri: imageUri,
    name: "cow.jpg",
    type: "image/jpeg",
  });

  console.log("📡 Sending to:", `${API_BASE_URL}/predict`);

  const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 20000,
  });

  console.log("✅ Response:", response.data);
  return { ...response.data, mode: "online" };
};

export const saveScan = async (resultData) => {
  try {
    const newScan = {
      breed: resultData.breed,
      disease: resultData.disease,
      confidence: resultData.disease_confidence,
      mode: resultData.mode ?? "online",
      date: new Date().toLocaleDateString(),
    };
    const existing = await AsyncStorage.getItem("recentScans");
    const existingScans = existing ? JSON.parse(existing) : [];
    const updated = [newScan, ...existingScans].slice(0, 10);
    await AsyncStorage.setItem("recentScans", JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.log("Save error:", e);
    return [];
  }
};