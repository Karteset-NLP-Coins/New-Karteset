import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { db, auth } from "../../firebase";
import Class from "../Components/Class";
import styles from "../styles";

const MyClassesScreen = ({ navigation }) => {
  const currUserUid = auth.currentUser.uid;
  const [classesIDS, setClassesIDS] = useState([]);
  const [addingNewClass, setAddingNewClass] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [userType, setUserType] = useState(0);

  const fetchClasses = async () => {
    try {
      const classesIDSRef = db.collection("users").doc(currUserUid);
      const data = await classesIDSRef.get();
      setClassesIDS(data.data().classesIDS);
      setUserType(data.data().type);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
  };
  const createNewClass = async () => {
    const newClass = {
      name: "כיתה חדשה",
      foldersIDS: [],
      creatorID: currUserUid,
    };
    const classRef = await db.collection("class").add(newClass);
    const newClassId = classRef.id;
    const classesIDSRef = db.collection("users").doc(currUserUid);
    const data = await classesIDSRef.get();
    try {
      setClassesIDS(data.data().classesIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
    classesIDS.push(newClassId);
    const newObject = { ...data.data(), classesIDS };
    classesIDSRef.set(newObject);
    setClassesIDS(classesIDS);
  };
  const addNewClass = async (classID) => {
    var classRef;
    try {
      classRef = await db.collection("class").doc(classID).get(); // check if id is real
    } catch (error) {
      alert("קוד כיתה שגוי");
      console.log("Document does not exists");
      setClassesIDS(classesIDS);
      setAddingNewClass(false);
      return;
    }
    if (!classRef.exists) {
      alert("קוד כיתה שגוי");
      console.log("collection does not exists");
      setClassesIDS(classesIDS);
      setAddingNewClass(false);
      return;
    }

    const classesIDSRef = db.collection("users").doc(currUserUid);
    const data = await classesIDSRef.get();
    try {
      setClassesIDS(data.data().classesIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
    classesIDS.push(classID);
    const newObject = { ...data.data(), classesIDS };
    classesIDSRef.set(newObject);
    setClassesIDS(classesIDS);
    setAddingNewClass(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <View style={updateStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {addingNewClass ? (
          <View>
            <View style={updateStyles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder={"קוד כיתה"}
                placeholderTextColor="#C9C9C9"
                onChangeText={(classCode) => {
                  setClassCode(classCode);
                }}
              />
            </View>
            <TouchableOpacity
              style={updateStyles.btn}
              onPress={() => addNewClass(classCode)}
            >
              <Text style={styles.btnText}>סיים</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={updateStyles.addBtn}
              onPress={() => setAddingNewClass(true)}
            >
              <Text style={styles.btnText}>הוסף כיתה</Text>
            </TouchableOpacity>
            {userType === 1 ? (
              <TouchableOpacity
                style={updateStyles.createBtn}
                onPress={() => createNewClass()}
              >
                <Text style={styles.btnText}>צור כיתה חדשה</Text>
              </TouchableOpacity>
            ) : null}
            <View style={updateStyles.componentsPlacement}>
              {classesIDS.map((classID, key) => {
                return (
                  <Class
                    key={key}
                    classID={classID}
                    navigation={navigation}
                    setClassesIDS={setClassesIDS}
                    userID={currUserUid}
                  />
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  btn: {
    backgroundColor: "#CA3E47",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 15,
    top: 70,
    left: 100,
    position: "absolute",
  },
  inputView: {
    backgroundColor: "#676767",
    borderRadius: 15,
    height: 50,
    width: 300,
    marginBottom: 20,
    alignItems: "center",
    top: -10,
  },
  addBtn: {
    backgroundColor: "#CA3E47",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 40,
    borderRadius: 15,
    bottom: 210,
    left: 120,
  },
  createBtn: {
    backgroundColor: "#CA3E47",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 150,
    borderRadius: 15,
    right: 120,
    bottom: 250,
  },
  container: {
    backgroundColor: "#313131",
    flex: 1,
    justifyContent: "center",
  },
  componentsPlacement: {
    flex: 1,
    top: -150,
    right: -75,
    position: "absolute",
  },
});

export default MyClassesScreen;
