import React, { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import styles from "../styles";

import { auth } from "../../firebase";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    if (email != "" && password != "") {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        navigation.navigate("Select");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="אימייל"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="סיסמא"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => logIn()}>
        <Text style={styles.btnText}>היכנס</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.btnText}>הירשם</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogInScreen;
