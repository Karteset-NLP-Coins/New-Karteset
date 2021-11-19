import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  const arr = [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>שלום וברוכים הבאים לכרטסת</Text>
      <Text style={styles.header}>אנא בחרו את צורת הכניסה שלכם</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={styles.buttonText}>כניסת מורה</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Kartisia", {
            itemId: 10,
            kartisim: arr,
          })
        }
      >
        <Text style={styles.buttonText}>כניסת תלמיד</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "relative",
    top: -200,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 40,
    width: 200,
    margin: 10,
    backgroundColor: "#76B947",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
