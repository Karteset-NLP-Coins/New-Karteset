import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import styles from "../styles";

import { auth } from "../../firebase";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const enterEmail = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (e) {}
    alert("נשלחה הודעה למייל זה");
    navigation.navigate("LogIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="הכנס את מייל המשתמש שלך"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
      </View>
      <TouchableOpacity
        style={updateStyles.forgotPassBtn}
        onPress={() => enterEmail()}
      >
        <Text style={styles.btnText}>שלח מייל</Text>
      </TouchableOpacity>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  forgotPassBtn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 15,
    marginBottom: 10,
    padding: 5,
  },
});

export default ForgotPasswordScreen;
