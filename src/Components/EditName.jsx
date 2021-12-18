import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import styles from "../styles";
import { deleteComponent } from "../deleteUtils";

const EditName = ({
  idToDelete,
  parentIDToDelete,
  setComponentIDS,
  type,
  update,
  oldName = "",
  setEdit,
}) => {
  const [name, setName] = useState(oldName);

  const deleteComp = () => {
    deleteComponent(idToDelete, parentIDToDelete, setComponentIDS, type);
    setEdit(false);
  };

  return (
    <View style={updateStyles.container}>
      <TouchableOpacity
        style={updateStyles.delBtn}
        onPress={() => deleteComp()}
      >
        <Text style={styles.btnText}>מחק</Text>
      </TouchableOpacity>
      <View style={updateStyles.inputView}>
        <TextInput
          style={styles.textInput}
          defaultValue={oldName == "" ? "שם" : oldName}
          placeholderTextColor="#C9C9C9"
          onChangeText={(name) => {
            setName(name);
          }}
        />
      </View>
      <TouchableOpacity style={updateStyles.btn} onPress={() => update(name)}>
        <Text style={styles.btnText}>סיים</Text>
      </TouchableOpacity>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    height: 100,
  },
  inputView: {
    backgroundColor: "#676767",
    borderRadius: 15,
    height: 45,
    width: 300,
    marginBottom: 20,
    alignItems: "center",
    top: -15,
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
    bottom: 0,
    right: 0,
    zIndex: 1,
    position: "absolute",
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
    bottom: 0,
    left: 0,
    zIndex: 1,
    position: "absolute",
  },
});

export default EditName;
