import React, { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
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
          placeholderTextColor="#C9C9C9"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => enterEmail()}>
        <Text style={styles.btnText}>שלח מייל</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
