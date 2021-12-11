import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";

const EditCard = ({
  oldContent = "",
  oldName = "",
  oldRightAnswer = "",
  oldAnswers = [],
  loadCardData,
  deleteCard,
}) => {
  const [content, setContent] = useState(oldContent);
  const [cardName, setCardName] = useState(oldName);
  const [rightAnswer, setRightAnswer] = useState(oldRightAnswer);
  const [answers, setAnswers] = useState(oldAnswers);

  return (
    <View style={updateStyles.container}>
      {deleteCard !== undefined ? (
        <TouchableOpacity
          style={updateStyles.delBtn}
          onPress={() => deleteCard()}
        >
          <Text style={styles.btnText}>מחק כרטיס</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder={oldName == "" ? "שם הכרטיס" : oldName}
          placeholderTextColor="#003f5c"
          onChangeText={(name) => {
            setCardName(name);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder={oldContent == "" ? "תוכן הכרטיס" : oldContent}
          placeholderTextColor="#003f5c"
          onChangeText={(content) => {
            setContent(content);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder={oldRightAnswer == "" ? "תשובה" : oldRightAnswer}
          placeholderTextColor="#003f5c"
          onChangeText={(answer) => {
            setRightAnswer(answer);
          }}
        />
      </View>

      <TouchableOpacity
        style={updateStyles.btn}
        onPress={() => loadCardData(cardName, content, rightAnswer)}
      >
        <Text style={styles.btnText}>סיים</Text>
      </TouchableOpacity>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  btn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 3,
    padding: 5,
    top: 130,
    zIndex: 1,
  },
  delBtn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 3,
    padding: 5,
    top: 0,
    right: 0,
    zIndex: 1,
    position: "absolute",
  },
});

export default EditCard;
