import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase";
import EditName from "./EditName";

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
          onLongPress={() => setEdit(true)}
        >
          <Text style={styles.btnText}>{currClass.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 5,
  },
  btnText: {
    fontSize: 20,
  },
});

export default Class;
