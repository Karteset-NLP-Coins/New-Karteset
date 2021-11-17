import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const MyDocumerntsScreen = (props) => {
  var arr = [1, 69, 420, 42069, "this aof the text to see what happends"];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createBtn}>
        <Text style={styles.buttonText}>צור קלסר</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  createBtn: {
    justifyContent: "center",
    textAlign: "right",
    backgroundColor: "#76B947",
    height: 40,
    width: 100,
    borderRadius: 30,
    margin: 10,
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyDocumerntsScreen;
