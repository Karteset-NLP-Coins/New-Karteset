import React, { useState } from "react";
import { StyleSheet,View, Text, TextInput, TouchableOpacity } from "react-native";

const EditCard = ({ oldContent="", oldName="", oldRightAnswer="",oldAnswers=[], loadCardData }) => {
  const [content, setContent] = useState(oldContent);
  const [cardName, setCardName] = useState(oldName);
  const [rightAnswer, setRightAnswer] = useState(oldRightAnswer);
  const [answers, setAnswers] = useState(oldAnswers);


  return (
    <View style={styles.container}>
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
        
        <TouchableOpacity style={styles.btn} onPress={() => loadCardData(cardName, content, rightAnswer)}>
          <Text style={styles.btnText}>סיים</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  inputView: {
    backgroundColor: "#94C973",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
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
  btnText: {
    fontSize: 20,
  },

  text: {
    marginTop: 10,
    fontSize: 20,
  },
  textInput: {
    height: 50,
    padding: 10,
    flex: 1,
  },
});

export default EditCard;
