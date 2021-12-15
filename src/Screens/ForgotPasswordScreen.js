import React, { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import styles from "../styles";

import { db, auth } from "../../firebase";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const enterEmail = async () => {
    // this query is to see if email is registered in the app, so we wont send pass reset to random emails
    var query = await db.collection("users").where("email", "==", email).get();
    if (query.docs.length !== 0) {
      try {
        await auth.sendPasswordResetEmail(email);
      } catch (e) {}
    } else {
      console.log("email not real");
    }
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
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={styles.btnText}>חזור אחורה</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
