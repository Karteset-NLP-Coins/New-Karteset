import React, { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import CheckBox from "react-native-check-box";
import styles from "../styles";

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
        alert("המייל נמצא בשימוש");
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
          placeholderTextColor="#C9C9C9"
          onChangeText={(email) => {
            setFirstEmail(email);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="אמת אימייל"
          placeholderTextColor="#C9C9C9"
          onChangeText={(email) => {
            setSecondEmail(email);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="סיסמא"
          placeholderTextColor="#C9C9C9"
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
          placeholderTextColor="#C9C9C9"
          secureTextEntry={true}
          onChangeText={(password) => {
            setSecondPassword(password);
          }}
        />
      </View>
      <CheckBox
        style={styles.checkBox}
        rightTextStyle={styles.checkBoxTextStyle}
        onClick={() => setCheckBox(!checkBox)}
        isChecked={checkBox}
        rightText="האם הנך מרצה?"
        checkBoxColor="#CBCACA"
      />
      <TouchableOpacity style={styles.btn} onPress={() => createUser()}>
        <Text style={styles.btnText}>צור משתמש</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;
