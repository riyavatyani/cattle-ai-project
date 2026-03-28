import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ScanCard({ onScanPress, onUploadPress }) {
  return (
    <View style={styles.card}>

      <Text style={styles.icon}>📷</Text>

      <Text style={styles.title}>Scan Cow</Text>

      <Text style={styles.subtitle}>
        Capture or upload cow image for AI detection
      </Text>

      <Pressable style={styles.scanButton} onPress={onScanPress}>
        <Text style={styles.buttonText}>Start Scan</Text>
      </Pressable>

      <Pressable style={styles.uploadButton} onPress={onUploadPress}>
        <Text style={styles.uploadText}>Upload Image</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  card:{
    backgroundColor:"white",
    padding:25,
    borderRadius:20,
    alignItems:"center",
    marginBottom:20,
    shadowColor:"#000",
    shadowOpacity:0.1,
    shadowRadius:10,
    elevation:5
  },

  icon:{
    fontSize:40,
    marginBottom:10
  },

  title:{
    fontSize:20,
    fontWeight:"bold"
  },

  subtitle:{
    color:"gray",
    marginBottom:15
  },

  scanButton:{
    backgroundColor:"#2e7d32",
    paddingVertical:12,
    paddingHorizontal:30,
    borderRadius:10,
    marginBottom:10
  },

  buttonText:{
    color:"white",
    fontWeight:"bold"
  },

  uploadButton:{
    borderWidth:1,
    borderColor:"#2e7d32",
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:10
  },

  uploadText:{
    color:"#2e7d32",
    fontWeight:"bold"
  }

});