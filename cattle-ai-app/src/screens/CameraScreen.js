import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useRef } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { resizeImage } from "../services/imageProcessor";

export default function CameraScreen({ navigation }) {

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera permission required</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const sendToBackend = async (imageUri) => {
    try {

      const formData = new FormData();

      formData.append("image", {
        uri: imageUri,
        name: "cow.jpg",
        type: "image/jpeg"
      });

      console.log("Sending image to backend...");
      console.log("Image URI:", imageUri);

      const response = await axios.post(
        "http://192.168.1.7:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("API RESPONSE:", response.data);

      navigation.replace("Result", {
        image: imageUri,
        result: response.data
      });

    } catch (error) {

      console.log("API ERROR:", error);

      alert("Prediction failed");

      navigation.replace("Result", {
        image: imageUri,
        result: null
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
        quality: 1
      });

      if (result.canceled) {
        console.log("User cancelled image picker");
        return;
      }

      const imageUri = result.assets[0].uri;

      console.log("Selected image:", imageUri);

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

      <Pressable style={styles.captureButton} onPress={takePhoto}>
        <Text style={styles.captureText}>📸</Text>
      </Pressable>

      <Pressable style={styles.uploadButton} onPress={uploadImage}>
        <Text style={styles.uploadText}>Upload Image</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1 },
  camera:{ flex:1 },

  captureButton:{
    position:"absolute",
    bottom:80,
    alignSelf:"center",
    backgroundColor:"white",
    padding:20,
    borderRadius:50
  },

  captureText:{ fontSize:24 },

  uploadButton:{
    position:"absolute",
    bottom:20,
    alignSelf:"center",
    backgroundColor:"#2e7d32",
    padding:15,
    borderRadius:10
  },

  uploadText:{
    color:"white",
    fontWeight:"bold"
  }
});