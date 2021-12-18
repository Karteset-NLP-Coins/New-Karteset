import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styles from "../styles";

const ShowID = ({ ID, setShowID }) => {
  return (
    <View>
      <Text style={updateStyles.showID} selectable>
        {ID}
      </Text>
      <TouchableOpacity
        style={updateStyles.backBtn}
        onPress={() => setShowID(false)}
      >
        <Text style={styles.btnText}>חזור אחורה</Text>
      </TouchableOpacity>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  showID: {
    bottom: 200,
    color: "#C9C9C9",
    fontSize: 25,
  },
  backBtn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CA3E47",
    height: 40,
    width: 150,
    borderRadius: 15,
    left: 60,
  },
});

export default ShowID;
