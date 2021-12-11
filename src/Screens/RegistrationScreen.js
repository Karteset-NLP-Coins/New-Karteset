import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import CheckBox from "react-native-check-box";

import { auth, db } from "../../firebase";

const RegistrationScreen = ({ navigation }) => {
  const [firstEmail, setFirstEmail] = useState("");
  const [secondEmail, setSecondEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  const createUser = async () => {
    if (firstEmail === "" || firstPassword === "") {
      alert("נא למלא את כל השדות");
    } else if (firstEmail === secondEmail && firstPassword === secondPassword) {
      try {
        await auth.createUserWithEmailAndPassword(firstEmail, firstPassword);
        const currentUser = auth.currentUser;
        db.collection("users")
          .doc(currentUser.uid)
          .set({
            email: currentUser.email,
            foldersIDS: [],
            classesIDS: [],
            type: checkBox ? 1 : 0, // 1 is teacher 0 is student
          });
        navigation.navigate("LogIn");
        alert("הכנת המשתמש בוצעה בהצלחה");
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("אימייל או סיסמא אינם זהים");
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
            setFirstEmail(email);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="אמת אימייל"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => {
            setSecondEmail(email);
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
            setFirstPassword(password);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="אמת סיסמא"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => {
            setSecondPassword(password);
          }}
        />
      </View>
      <CheckBox
        style={styles.checkBox}
        onClick={() => setCheckBox(!checkBox)}
        isChecked={checkBox}
        rightText={"האם הנך מרצה?"}
      />
      <TouchableOpacity style={styles.logIn} onPress={() => createUser()}>
        <Text style={styles.buttonText}>צור משתמש</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    paddingBottom: 10,
  },
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

export default RegistrationScreen;
