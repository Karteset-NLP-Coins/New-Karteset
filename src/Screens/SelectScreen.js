import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const SelectSreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>אנא בחרו לאן ברצונכם להיכנס</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MyFolders")}
      >
        <Text style={styles.buttonText}>הקלסרים שלי</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MyClasses")}
      >
        <Text style={styles.buttonText}>הכיתות שלי</Text>
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

export default SelectSreen;
