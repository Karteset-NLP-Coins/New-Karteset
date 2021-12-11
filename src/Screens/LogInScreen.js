import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

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
      <TouchableOpacity style={styles.logIn} onPress={() => logIn()}>
        <Text style={styles.buttonText}>היכנס</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logIn}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>הירשם</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#94C973",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    padding: 10,
    flex: 1,
  },
  forgotPassword: {
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  logIn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 40,
    width: 200,
    marginBottom: 20,
    backgroundColor: "#76B947",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogInScreen;
