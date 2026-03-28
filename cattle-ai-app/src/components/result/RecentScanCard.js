import { View, Text, StyleSheet } from "react-native";

export default function RecentScanCard({ breed, disease }) {

  return (
    <View style={styles.card}>

      <Text style={styles.breed}>
        {breed}
      </Text>

      <Text style={styles.disease}>
        {disease}
      </Text>

    </View>
  );

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2
  },
  breed: {
    fontWeight: "bold"
  },
  disease: {
    color: "gray"
  }
});