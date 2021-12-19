import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { db, auth, arrayUnion } from "../../firebase";
import Class from "../Components/Class";
import styles from "../styles";
import OptionsMenu from "react-native-option-menu";
const more = require("../../icons/more.png");

const MyClassesScreen = ({ navigation }) => {
  const currUserUid = auth.currentUser.uid;
  const [classesIDS, setClassesIDS] = useState([]);
  const [addingNewClass, setAddingNewClass] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [userType, setUserType] = useState(0);

  // dynamically update header
  const updateHeader = () => {
    console.log("update header");
    navigation.setParams({
      headerRight: (
        <OptionsMenu
          button={more}
          buttonStyle={{
            width: 80,
            height: 50,
            margin: 7.5,
            resizeMode: "contain",
          }}
          options={["הכיתות שלי", "הקלסרים שלי", "סגור"]}
          actions={[
            () => navigation.navigate("MyClasses"),
            () => navigation.navigate("MyFolders"),
          ]}
        />
      ),
    });
  };

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
    // create new class
    const newClass = {
      name: "כיתה חדשה",
      foldersIDS: [],
      studentsIDS: [],
      creatorID: currUserUid,
    };
    // add new class to class collection
    const classRef = await db.collection("class").add(newClass);
    const newClassId = classRef.id;
    // re-render new class
    classesIDS.push(newClassId);
    setClassesIDS([...classesIDS]);
    // add new classID to user classesIDS
    const classesIDSRef = db.collection("users").doc(currUserUid);
    await classesIDSRef.update({
      classesIDS: arrayUnion(newClassId),
    });
  };

  const addNewClass = async (classID) => {
    var classRef;
    var getClass;
    // check if id exists
    try {
      classRef = db.collection("class").doc(classID);
      getClass = await classRef.get();
    } catch (error) {
      alert("קוד כיתה שגוי");
      console.log("Document does not exists");
      setClassesIDS(classesIDS);
      setAddingNewClass(false);
      return;
    }
    if (!getClass.exists) {
      alert("קוד כיתה שגוי");
      console.log("Document does not exists");
      setClassesIDS(classesIDS);
      setAddingNewClass(false);
      return;
    }
    // re-render with new class
    classesIDS.push(classID);
    setClassesIDS([...classesIDS]);
    setAddingNewClass(false);
    // add class id to user
    const classesIDSRef = db.collection("users").doc(currUserUid);
    await classesIDSRef.update({
      classesIDS: arrayUnion(classID),
    });
    await classRef.update({
      studentsIDS: arrayUnion(currUserUid),
    });
  };

  useEffect(() => {
    fetchClasses();
    updateHeader();
  }, []);

  return (
    <View style={styles.container}>
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topRow}>
            <TouchableOpacity
              style={
                userType === 1 ? styles.topRightBtn : updateStyles.topRightBtn
              }
              onPress={() => setAddingNewClass(true)}
            >
              <Text style={styles.btnText}>הוסף כיתה</Text>
            </TouchableOpacity>
            {userType === 1 ? (
              <TouchableOpacity
                style={styles.topLeftBtn}
                onPress={() => createNewClass()}
              >
                <Text style={styles.btnText}>צור כיתה חדשה</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.componentsPlacement}>
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
        </ScrollView>
      )}
    </View>
  );
};

const updateStyles = StyleSheet.create({
  topRightBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    backgroundColor: "#CA3E47",
    height: 40,
    width: 150,
    borderRadius: 15,
    margin: 5,
    left: 115,
  },
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
});

MyClassesScreen.navigationOptions = ({ navigation }) => ({
  headerRight: navigation.getParam("headerRight"),
});

export default MyClassesScreen;
