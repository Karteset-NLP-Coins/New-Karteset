import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { db, auth } from "../../firebase";
import styles from "../styles";

const Class = ({ navigation, classID, loadClassData }) => {
  const [currClass, setCurrClass] = useState({});

  const fetchData = async () => {
    try {
      const classesRef = db.collection("class").doc(classID);
      const data = await classesRef.get();
      setCurrClass(data.data());
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkEditValid = () => {
    if (auth.currentUser.uid === currClass.creatorID) {
      loadClassData(classID, currClass);
    }
  };

  return (
    <TouchableOpacity
      style={styles.componentBtn}
      onPress={() => {
        navigation.navigate("Class", {
          classID: classID,
          type: "class",
        });
      }}
      onLongPress={() => checkEditValid()}
    >
      <Text style={styles.btnText}>{currClass.name}</Text>
    </TouchableOpacity>
  );
};

export default Class;
