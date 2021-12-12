import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { db, auth } from "../../firebase";
import EditName from "./EditName";
import styles from "../styles";

const Class = ({ classID, navigation }) => {
  const [currClass, setCurrClass] = useState({});
  const [edit, setEdit] = useState(false);

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
      setEdit(true);
    }
  };

  const loadClassData = async (name) => {
    currClass.name = name;
    setCurrClass(currClass);
    try {
      const classRef = db.collection("class").doc(classID);
      await classRef.update(currClass);
      console.log("Updated Name");
    } catch (error) {
      console.log("error!");
    }
    setEdit(false);
  };
  const deleteComponent = () => {
    console.log("Deleting!");
  };

  return (
    <View>
      {edit ? (
        <EditName
          oldName={currClass.name}
          update={loadClassData}
          deleteComponent={deleteComponent}
        />
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Class", {
              classID: classID,
            });
          }}
          onLongPress={() => checkEditValid()}
        >
          <Text style={styles.btnText}>{currClass.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Class;
