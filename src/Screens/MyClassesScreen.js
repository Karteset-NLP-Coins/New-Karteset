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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {addingNewClass ? (
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder={"קוד כיתה"}
              placeholderTextColor="#003f5c"
              onChangeText={(classCode) => {
                setClassCode(classCode);
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => addNewClass(classCode)}
            >
              <Text style={styles.btnText}>סיים</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.addBtn}>
              <Text
                style={styles.buttonText}
                onPress={() => setAddingNewClass(true)}
              >
                הוסף כיתה
              </Text>
            </TouchableOpacity>
            {userType === 1 ? (
              <TouchableOpacity style={styles.createBtn}>
                <Text
                  style={styles.buttonText}
                  onPress={() => createNewClass()}
                >
                  צור כיתה חדשה
                </Text>
              </TouchableOpacity>
            ) : null}
            <View style={styles.foldersPlacement}>
              {classesIDS.map((classID, key) => {
                return (
                  <Class key={key} classID={classID} navigation={navigation} />
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  textInput: {
    height: 50,
    padding: 10,
    flex: 1,
    bottom: 30,
  },
  inputView: {
    backgroundColor: "#94C973",
    borderRadius: 30,
    height: 100,
    width: 300,
    marginBottom: 20,
    alignItems: "center",
    top: -10,
  },
  foldersPlacement: {
    flex: 1,
    position: "relative",
    top: 70,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  addBtn: {
    justifyContent: "center",
    textAlign: "right",
    backgroundColor: "#76B947",
    height: 40,
    width: 150,
    borderRadius: 30,
    margin: 10,
    position: "absolute",
    left: 0,
    top: 10,
  },
  createBtn: {
    justifyContent: "center",
    textAlign: "right",
    backgroundColor: "#76B947",
    height: 40,
    width: 150,
    borderRadius: 30,
    margin: 10,
    position: "absolute",
    right: 0,
    top: 10,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

export default MyClassesScreen;
