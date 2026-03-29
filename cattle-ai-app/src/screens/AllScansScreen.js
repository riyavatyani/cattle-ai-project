import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Alert
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../constants/translations";

export default function AllScansScreen({ navigation }) {

  const { language } = useLanguage();
  const t = translations[language] ?? translations["en"];
  const [scans, setScans] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const stored = await AsyncStorage.getItem("recentScans");
          if (stored) setScans(JSON.parse(stored));
          else setScans([]);
        } catch (e) {
          console.log("Failed to load:", e);
        }
      };
      load();
    }, [])
  );

  const clearAll = () => {
    Alert.alert(
      t.clearTitle,
      t.clearConfirm,
      [
        { text: t.cancel, style: "cancel" },
        {
          text: t.clearAll,
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("recentScans");
            setScans([]);
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => {
    const isHealthy = item.disease?.toLowerCase() === "healthy";
    return (
      <View style={styles.card}>

        <View style={styles.left}>
          <View style={styles.indexBadge}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
        </View>

        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🐄</Text>
        </View>

        <View style={styles.middle}>
          <Text style={styles.breed}>
            {item.breed.charAt(0).toUpperCase() + item.breed.slice(1)}
          </Text>
          <Text style={[styles.disease, isHealthy ? styles.healthy : styles.sick]}>
            {isHealthy ? "✅" : "⚠️"} {item.disease}
          </Text>
          <Text style={styles.date}>📅 {item.date}</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.confidence}>{item.confidence}%</Text>
          <Text style={styles.confLabel}>{t.confidence}</Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>📋 {t.allScansTitle}</Text>
          <Text style={styles.headerSub}>
            {scans.length} {t.allScansRecorded}
          </Text>
        </View>
        {scans.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearText}>🗑️ {t.clearAll}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── List ── */}
      {scans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🐄</Text>
          <Text style={styles.emptyText}>{t.noScans}</Text>
          <TouchableOpacity
            style={styles.scanNowButton}
            onPress={() => navigation.navigate("Scan")}
          >
            <Text style={styles.scanNowText}>📷 {t.startScan}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={scans}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f8e9",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dcedc8",
    elevation: 3,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1b5e20",
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 12,
    color: "#6a8f6a",
    marginTop: 3,
    fontWeight: "500",
  },
  clearButton: {
    backgroundColor: "#fce4ec",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f8bbd0",
  },
  clearText: {
    color: "#c62828",
    fontWeight: "700",
    fontSize: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dcedc8",
    elevation: 3,
    shadowColor: "#a5d6a7",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  left: { marginRight: 10 },
  indexBadge: {
    backgroundColor: "#e8f5e9",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#a5d6a7",
  },
  indexText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2e7d32",
  },
  iconCircle: {
    backgroundColor: "#f1f8e9",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: { fontSize: 24 },
  middle: { flex: 1 },
  breed: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 3,
  },
  disease: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 3,
  },
  healthy: { color: "#2e7d32" },
  sick: { color: "#c62828" },
  date: {
    fontSize: 11,
    color: "#aaa",
    fontWeight: "500",
  },
  right: { alignItems: "center" },
  confidence: {
    fontSize: 16,
    fontWeight: "800",
    color: "#43a047",
  },
  confLabel: {
    fontSize: 10,
    color: "gray",
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 15,
    color: "gray",
    textAlign: "center",
    marginBottom: 24,
  },
  scanNowButton: {
    backgroundColor: "#43a047",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  scanNowText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});