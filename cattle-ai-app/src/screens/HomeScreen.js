import { View, ScrollView, Text } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";   // ⭐ ADD THIS

import { styles } from "./styles/HomeStyles";

import LanguageToggle from "../components/ui/LanguageToggle";
import HeroSection from "../components/layout/HeroSection";
import ScanCard from "../components/camera/ScanCard";
import FeatureGrid from "../components/ui/FeatureGrid";
import HelpCard from "../components/ui/HelpCard";
import RecentScanCard from "../components/result/RecentScanCard";

export default function HomeScreen({ navigation }) {

  const [language, setLanguage] = useState("en");

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1
    });

    if (result.canceled) return;

    const imageUri = result.assets[0].uri;

    console.log("Selected image:", imageUri);

    try {

      const formData = new FormData();

      formData.append("image", {
        uri: imageUri,
        name: "cow.jpg",
        type: "image/jpeg"
      });

      console.log("Sending image to backend...");

      const response = await axios.post(
        "http://192.168.1.7:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      console.log("API RESPONSE:", response.data);

      navigation.navigate("Scan", {
        screen: "Result",
        params: {
          image: imageUri,
          result: response.data
        }
      });

    } catch (error) {

      console.log("UPLOAD ERROR:", error);

      navigation.navigate("Scan", {
        screen: "Result",
        params: {
          image: imageUri,
          result: null
        }
      });

    }

  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.topBar}>
        <LanguageToggle
          language={language}
          setLanguage={setLanguage}
        />
      </View>

      <HeroSection />

      <ScanCard
        onScanPress={() => navigation.navigate("Scan")}
        onUploadPress={pickImage}
      />

      <FeatureGrid />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📊 Recent Scans</Text>
        <View style={styles.line} />
      </View>

      <RecentScanCard
        breed="Gir"
        disease="Healthy"
      />

      <RecentScanCard
        breed="Sahiwal"
        disease="Lumpy Skin Disease"
      />

      <HelpCard />

    </ScrollView>

  );
}