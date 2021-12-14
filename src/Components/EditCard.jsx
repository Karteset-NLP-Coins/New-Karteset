import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import { deleteCard } from "../deleteUtils";

const EditCard = ({
  oldContent = "",
  oldRightAnswer = "",
  oldAnswers = [],
  loadCardData,
  cardID,
  documentID,
  setCardsIDS,
}) => {
  const [content, setContent] = useState(oldContent);
  const [rightAnswer, setRightAnswer] = useState(oldRightAnswer);
  const [answers, setAnswers] = useState(oldAnswers);

  return (
    <View style={updateStyles.container}>
      {content !== "" ? (
        <TouchableOpacity
          style={updateStyles.delBtn}
          onPress={() => deleteCard(cardID, documentID, setCardsIDS)}
        >
          <Text style={styles.btnText}>מחק כרטיס</Text>
        </TouchableOpacity>
      ) : null}
      <View style={updateStyles.content}>
        <TextInput
          multiline
          style={styles.textInput}
          defaultValue={oldContent === "" ? "" : oldContent}
          placeholder={"תוכן הכרטיס"}
          placeholderTextColor="#C9C9C9"
          onChangeText={(content) => {
            setContent(content);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          multiline
          style={styles.textInput}
          defaultValue={oldRightAnswer === "" ? "" : oldRightAnswer}
          placeholder={"תשובה"}
          placeholderTextColor="#C9C9C9"
          onChangeText={(answer) => {
            setRightAnswer(answer);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          multiline
          style={styles.textInput}
          defaultValue={oldAnswers[0] === undefined ? "" : oldAnswers[0]}
          placeholder={"תשובה מס 1"}
          placeholderTextColor="#C9C9C9"
          onChangeText={(answer) => {
            answers[0] = answer;
            setAnswers(answers);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          multiline
          style={styles.textInput}
          defaultValue={oldAnswers[1] === undefined ? "" : oldAnswers[1]}
          placeholder={"תשובה מס 2"}
          placeholderTextColor="#C9C9C9"
          onChangeText={(answer) => {
            answers[1] = answer;
            setAnswers(answers);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          multiline
          style={styles.textInput}
          defaultValue={oldAnswers[2] === undefined ? "" : oldAnswers[2]}
          placeholder={"תשובה מס 3"}
          placeholderTextColor="#C9C9C9"
          onChangeText={(answer) => {
            answers[2] = answer;
            setAnswers(answers);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          multiline
          style={styles.textInput}
          defaultValue={oldAnswers[3] === undefined ? "" : oldAnswers[3]}
          placeholder={"תשובה מס 4"}
          placeholderTextColor="#C9C9C9"
          onChangeText={(answer) => {
            answers[3] = answer;
            setAnswers(answers);
          }}
        />
      </View>

      <TouchableOpacity
        style={updateStyles.btn}
        onPress={() => loadCardData(content, rightAnswer, answers)}
      >
        <Text style={styles.btnText}>סיים</Text>
      </TouchableOpacity>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  content: {
    backgroundColor: "#676767",
    borderRadius: 15,
    width: "70%",
    height: 130,
    marginBottom: 10,
    alignItems: "stretch",
  },
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
    backgroundColor: "#CA3E47",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 10,
    marginBottom: 3,
    padding: 5,
    top: 0,
    zIndex: 1,
  },
  delBtn: {
    backgroundColor: "#CA3E47",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 40,
    borderRadius: 10,
    marginBottom: 3,
    padding: 5,
    top: 0,
    right: 0,
    zIndex: 1,
    position: "absolute",
  },
});

export default EditCard;
