import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>שלום וברוכים הבאים לכרטסת</Text>
      <Text style={styles.header}>אנא בחרו את צורת הכניסה שלכם</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={styles.btnText}>התחברות</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
