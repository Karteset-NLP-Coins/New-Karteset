import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles";

const SelectSreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>אנא בחרו לאן ברצונכם להיכנס</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("MyFolders")}
      >
        <Text style={styles.btnText}>הקלסרים שלי</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("MyClasses")}
      >
        <Text style={styles.btnText}>הכיתות שלי</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectSreen;
