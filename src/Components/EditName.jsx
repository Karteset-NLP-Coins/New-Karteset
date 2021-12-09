import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

const EditName = ({ deleteComponent, update, oldName = "" }) => {
  const [name, setName] = useState(oldName);

  return (
    <View style={styles.container}>
      {deleteComponent !== undefined ? (
        <TouchableOpacity
          style={styles.delBtn}
          onPress={() => deleteComponent()}
        >
          <Text style={styles.btnText}>מחק</Text>
        </TouchableOpacity>
      ) : null}
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder={oldName == "" ? "שם" : oldName}
          placeholderTextColor="#003f5c"
          onChangeText={(name) => {
            setName(name);
          }}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => update(name)}>
        <Text style={styles.btnText}>סיים</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    height: 100,
  },
  inputView: {
    backgroundColor: "#94C973",
    borderRadius: 30,
    height: 45,
    width: 300,
    marginBottom: 20,
    alignItems: "center",
    top: -10,
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
    bottom: 0,
    right: 0,
    zIndex: 1,
    position: "absolute",
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
    bottom: 0,
    left: 0,
    zIndex: 1,
    position: "absolute",
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

export default EditName;
