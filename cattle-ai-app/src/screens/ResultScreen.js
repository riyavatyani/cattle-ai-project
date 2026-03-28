import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable } from "react-native";

export default function ResultScreen({ route, navigation }) {

  const image = route?.params?.image;
  const result = route?.params?.result;

  const loading = !result;

  const startNewScan = () => {
    navigation.navigate("Scan"); // change if your screen name is Camera
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>AI Result</Text>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#2e7d32" />
          <Text style={styles.loadingText}>Analyzing image...</Text>
        </View>
      ) : (
        <View style={styles.resultBox}>

          <Text style={styles.result}>
            Breed: {result.breed}
          </Text>

          <Text style={styles.result}>
            Disease: {result.disease}
          </Text>

          <Text style={styles.result}>
            Breed Confidence: {result.breed_confidence}%
          </Text>

          <Text style={styles.result}>
            Disease Confidence: {result.disease_confidence}%
          </Text>

        </View>
      )}

      <Pressable style={styles.scanButton} onPress={startNewScan}>
        <Text style={styles.scanText}>Start New Scan</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:20,
    backgroundColor:"#f5f5f5"
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:20
  },

  image:{
    width:260,
    height:260,
    borderRadius:12,
    marginBottom:20
  },

  loadingBox:{
    alignItems:"center"
  },

  loadingText:{
    marginTop:10,
    fontSize:16
  },

  resultBox:{
    alignItems:"center"
  },

  result:{
    fontSize:18,
    marginBottom:8
  },

  scanButton:{
    marginTop:25,
    backgroundColor:"#2e7d32",
    paddingVertical:12,
    paddingHorizontal:30,
    borderRadius:8
  },

  scanText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }

});