import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ScrollView, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./styles/HomeStyles";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../constants/translations";

import HeroSection from "../components/layout/HeroSection";
import ScanCard from "../components/camera/ScanCard";
import FeatureGrid from "../components/ui/FeatureGrid";
import HelpCard from "../components/ui/HelpCard";

export default function HomeScreen({ navigation }) {

  const { language, toggle } = useLanguage();
  const strings = translations[language] ?? translations["en"];
  const [recentScans, setRecentScans] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadScans();
    }, [])
  );

  const loadScans = async () => {
    try {
      const stored = await AsyncStorage.getItem("recentScans");
      if (stored) setRecentScans(JSON.parse(stored));
      else setRecentScans([]);
    } catch (e) {
      console.log("Failed to load scans:", e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });
    if (result.canceled) return;
    const imageUri = result.assets[0].uri;
    try {
      const formData = new FormData();
      formData.append("image", { uri: imageUri, name: "cow.jpg", type: "image/jpeg" });
      const response = await axios.post(
        "http://192.168.29.73:5000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const newScan = {
        breed: response.data.breed,
        disease: response.data.disease,
        confidence: response.data.disease_confidence,
        date: new Date().toLocaleDateString(),
      };
      const existing = await AsyncStorage.getItem("recentScans");
      const existingScans = existing ? JSON.parse(existing) : [];
      const updated = [newScan, ...existingScans].slice(0, 10);
      await AsyncStorage.setItem("recentScans", JSON.stringify(updated));
      setRecentScans(updated);
      navigation.navigate("Scan", {
        screen: "Result",
        params: { image: imageUri, result: response.data },
      });
    } catch (error) {
      console.log("Upload error:", error);
      navigation.navigate("Scan", {
        screen: "Result",
        params: { image: imageUri, result: null },
      });
    }
  };

  // ── Compute stats from scan history ──
  const total = recentScans.length;
  const healthy = recentScans.filter(s => s.disease?.toLowerCase() === "healthy").length;
  const diseased = total - healthy;
  const healthPercent = total > 0 ? Math.round((healthy / total) * 100) : 0;

  return (
    <ScrollView style={styles.container}>

      {/* ── Toggle ── */}
      <View style={styles.topBar}>
        <View style={toggleStyles.container}>
          <View style={toggleStyles.background}>
            <Text style={toggleStyles.bgText}>EN</Text>
            <Text style={toggleStyles.bgText}>हि</Text>
          </View>
          <TouchableOpacity
            style={[
              toggleStyles.toggle,
              language === "en" ? toggleStyles.left : toggleStyles.right,
            ]}
            onPress={toggle}
            activeOpacity={0.8}
          >
            <Text style={toggleStyles.label}>
              {language === "en" ? "EN" : "हि"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <HeroSection language={language} />

      {/* ── Mini Stats Row ── */}
      {total > 0 && (
        <View style={statsStyles.row}>
          <View style={[statsStyles.card, { borderColor: "#a5d6a7" }]}>
            <Text style={statsStyles.statNumber}>{total}</Text>
            <Text style={statsStyles.statLabel}>{strings.totalScans}</Text>
          </View>
          <View style={[statsStyles.card, { borderColor: "#81c784" }]}>
            <Text style={[statsStyles.statNumber, { color: "#2e7d32" }]}>{healthy}</Text>
            <Text style={statsStyles.statLabel}>{strings.healthyCount}</Text>
          </View>
          <View style={[statsStyles.card, { borderColor: "#f8bbd0" }]}>
            <Text style={[statsStyles.statNumber, { color: "#c62828" }]}>{diseased}</Text>
            <Text style={statsStyles.statLabel}>{strings.diseasedCount}</Text>
          </View>
        </View>
      )}

      {/* ── Health Summary Progress Bar ── */}
      {total > 0 && (
        <View style={progressStyles.card}>
          <View style={progressStyles.header}>
            <Text style={progressStyles.title}>🌿 {strings.healthSummary}</Text>
            <Text style={progressStyles.percent}>{healthPercent}%</Text>
          </View>
          <View style={progressStyles.barBg}>
            <View style={[progressStyles.barFill, { width: `${healthPercent}%` }]} />
          </View>
          <Text style={progressStyles.sub}>
            {healthy} {strings.of} {total} {strings.cowsHealthy}
          </Text>
        </View>
      )}

      <ScanCard
        language={language}
        onScanPress={() => navigation.navigate("Scan")}
        onUploadPress={pickImage}
      />

      <FeatureGrid language={language} />

      {/* ── Recent Scans Header ── */}
      <View style={sectionStyles.header}>
        <View>
          <Text style={sectionStyles.title}>{strings.recentScans}</Text>
          <View style={sectionStyles.line} />
        </View>
        {recentScans.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate("AllScans")}>
            <Text style={sectionStyles.seeAll}>{strings.seeAll} →</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Horizontal Scans ── */}
      {recentScans.length === 0 ? (
        <Text style={emptyStyle.text}>{strings.noScans}</Text>
      ) : (
        <FlatList
          data={recentScans}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 8 }}
          renderItem={({ item }) => (
            <View style={cardStyles.wrapper}>
              <View style={cardStyles.card}>
                <View style={cardStyles.iconCircle}>
                  <Text style={cardStyles.icon}>🐄</Text>
                </View>
                <Text style={cardStyles.breed}>
                  {item.breed.charAt(0).toUpperCase() + item.breed.slice(1)}
                </Text>
                <Text style={[
                  cardStyles.disease,
                  item.disease?.toLowerCase() === "healthy"
                    ? cardStyles.healthy : cardStyles.sick
                ]}>
                  {item.disease?.toLowerCase() === "healthy" ? "✅" : "⚠️"} {item.disease}
                </Text>
                <View style={cardStyles.footer}>
                  <Text style={cardStyles.confidence}>{item.confidence}%</Text>
                  <Text style={cardStyles.date}>{item.date}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}

      <HelpCard language={language} />

    </ScrollView>
  );
}

const toggleStyles = {
  container: { alignSelf: "flex-end" },
  background: {
    flexDirection: "row",
    width: 90,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#dcefe4",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bgText: { fontSize: 12, color: "#1a3c2e", fontWeight: "600" },
  toggle: {
    position: "absolute",
    width: 45,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#1a3c2e",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    elevation: 5,
  },
  left: { left: 0 },
  right: { right: 0 },
  label: { color: "#fff", fontWeight: "700", fontSize: 13 },
};

// ── Mini stats ──
const statsStyles = {
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1.5,
    elevation: 2,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#6a8f6a",
    fontWeight: "600",
    textAlign: "center",
  },
};

// ── Progress bar ──
const progressStyles = {
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#dcedc8",
    elevation: 3,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1b5e20",
  },
  percent: {
    fontSize: 18,
    fontWeight: "800",
    color: "#43a047",
  },
  barBg: {
    height: 10,
    backgroundColor: "#f1f8e9",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#dcedc8",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#43a047",
    borderRadius: 10,
  },
  sub: {
    fontSize: 12,
    color: "#6a8f6a",
    fontWeight: "500",
  },
};

const sectionStyles = {
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  line: {
    height: 2,
    backgroundColor: "#a5d6a7",
    width: 60,
    borderRadius: 5,
  },
  seeAll: {
    fontSize: 13,
    color: "#43a047",
    fontWeight: "700",
  },
};

const cardStyles = {
  wrapper: { marginRight: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    width: 150,
    borderWidth: 1,
    borderColor: "#dcedc8",
    elevation: 3,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  iconCircle: {
    backgroundColor: "#f1f8e9",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: { fontSize: 24 },
  breed: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 4,
  },
  disease: { fontSize: 12, fontWeight: "600", marginBottom: 10 },
  healthy: { color: "#2e7d32" },
  sick: { color: "#c62828" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confidence: { fontSize: 13, fontWeight: "800", color: "#43a047" },
  date: { fontSize: 10, color: "#aaa", fontWeight: "500" },
};

const emptyStyle = {
  text: {
    textAlign: "center",
    color: "gray",
    marginVertical: 16,
    fontSize: 14,
  },
};