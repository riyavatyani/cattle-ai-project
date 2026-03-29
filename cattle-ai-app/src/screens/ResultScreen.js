import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../constants/translations";
import { useState, useEffect } from "react";

export default function ResultScreen({ route, navigation }) {

  const { language } = useLanguage();
  const t = translations[language] ?? translations["en"];

  const image = route?.params?.image;
  const result = route?.params?.result;

  // ✅ Fixed loading logic
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (result !== undefined) {
      setLoading(false);
    }
  }, [result]);

  // ❌ Handle API failure
  if (result === null) {
    return (
      <View style={styles.loadingBox}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Failed to analyze image
        </Text>
      </View>
    );
  }

  const isHealthy = result?.disease?.toLowerCase() === "healthy";

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Header */}
      <LinearGradient
        colors={["#1b5e20", "#2e7d32", "#43a047"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🐄 {t.resultTitle}</Text>
        <Text style={styles.headerSub}>{t.resultSubtitle}</Text>
      </LinearGradient>

      {/* Image */}
      {image && (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>📷 {t.scannedImage}</Text>
          </View>
        </View>
      )}

      {/* Loading */}
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#2e7d32" />
          <Text style={styles.loadingText}>{t.analyzing}</Text>
        </View>

      ) : (
        <View style={styles.resultContainer}>

          {/* Status Banner */}
          <LinearGradient
            colors={isHealthy ? ["#e8f5e9", "#c8e6c9"] : ["#fce4ec", "#f8bbd0"]}
            style={styles.statusBanner}
          >
            <Text style={styles.statusIcon}>{isHealthy ? "✅" : "⚠️"}</Text>
            <Text style={[styles.statusText, { color: isHealthy ? "#1b5e20" : "#b71c1c" }]}>
              {isHealthy ? t.statusHealthy : t.statusSick}
            </Text>
          </LinearGradient>

          {/* Cards */}
          <View style={styles.cardRow}>

            <View style={styles.resultCard}>
              <Text style={styles.cardIcon}>🐄</Text>
              <Text style={styles.cardLabel}>{t.breed}</Text>
              <Text style={styles.cardValue}>
                {result.breed.charAt(0).toUpperCase() + result.breed.slice(1)}
              </Text>
              <View style={styles.confidenceBar}>
                <View style={[styles.confidenceFill, {
                  width: `${result.breed_confidence}%`,
                  backgroundColor: "#2e7d32"
                }]} />
              </View>
              <Text style={styles.confidenceText}>
                {result.breed_confidence}% {t.confidence}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.cardIcon}>🦠</Text>
              <Text style={styles.cardLabel}>{t.disease}</Text>
              <Text style={[styles.cardValue, { color: isHealthy ? "#2e7d32" : "#c62828" }]}>
                {result.disease.charAt(0).toUpperCase() + result.disease.slice(1)}
              </Text>
              <View style={styles.confidenceBar}>
                <View style={[styles.confidenceFill, {
                  width: `${result.disease_confidence}%`,
                  backgroundColor: isHealthy ? "#2e7d32" : "#c62828"
                }]} />
              </View>
              <Text style={styles.confidenceText}>
                {result.disease_confidence}% {t.confidence}
              </Text>
            </View>

          </View>

        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>

        <Pressable
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.homeButtonText}>🏠 {t.backHome}</Text>
        </Pressable>

        <Pressable
          style={styles.scanButton}
          onPress={() => navigation.navigate("Scan", { screen: "Camera" })}
        >
          <Text style={styles.scanButtonText}>📷 {t.newScan}</Text>
        </Pressable>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f1f8e9",
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },
  headerSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 4,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 240,
    height: 240,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#2e7d32",
  },
  imageBadge: {
    marginTop: 8,
    backgroundColor: "#e8f5e9",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  imageBadgeText: {
    color: "#2e7d32",
    fontSize: 12,
    fontWeight: "600",
  },
  loadingBox: {
    alignItems: "center",
    marginTop: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#555",
  },
  resultContainer: {
    paddingHorizontal: 16,
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "800",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  resultCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    elevation: 4,
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 11,
    color: "gray",
    fontWeight: "600",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: 10,
  },
  confidenceBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 6,
  },
  confidenceFill: {
    height: "100%",
  },
  confidenceText: {
    fontSize: 11,
    color: "gray",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  homeButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#2e7d32",
    fontWeight: "700",
  },
  scanButton: {
    flex: 1,
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  scanButtonText: {
    color: "white",
    fontWeight: "700",
  },
});