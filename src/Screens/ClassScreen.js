import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Folder from "../Components/Folder";
import styles from "../styles";
import { db, auth } from "../../firebase";
import { arrayUnion } from "firebase/firestore";

const ClassScreen = ({ navigation }) => {
  const classID = navigation.getParam("classID");
  const [creatorID, setCreatorID] = useState("");
  const [foldersIDS, setFoldersIDS] = useState([]);

  const fetchFolders = async () => {
    try {
      const foldersIDSRef = db.collection("class").doc(classID);
      const data = await foldersIDSRef.get();
      setFoldersIDS(data.data().foldersIDS);
      setCreatorID(data.data().creatorID);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
  };

  const createNewFolder = async () => {
    const folder = {
      name: "נושא חדש",
      documentsIDS: [],
      creatorID: auth.currentUser.uid,
    };
    // adding new folder to folder collection
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    // adding new folder to class db
    const classFoldersIDSRef = db.collection("class").doc(classID);
    const classFolderData = await classFoldersIDSRef.get();
    try {
      setFoldersIDS(classFolderData.data().foldersIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
    foldersIDS.push(newFolderId); // adding new folderID to folderIDS
    const newClassFolder = { ...classFolderData.data(), foldersIDS };
    classFoldersIDSRef.set(newClassFolder);
    setFoldersIDS(foldersIDS); // re-render with new folder
    // adding new folder to user folders
    const foldersIDSRef = db.collection("users").doc(auth.currentUser.uid);
    await foldersIDSRef.update({
      foldersIDS: arrayUnion(newFolderId),
    });
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <View style={updateStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {creatorID === auth.currentUser.uid ? (
          <TouchableOpacity style={styles.createBtn}>
            <Text style={styles.btnText} onPress={() => createNewFolder()}>
              צור נושא
            </Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.componentsPlacement}>
          {foldersIDS.map((folderID, key) => {
            return (
              <Folder key={key} folderID={folderID} navigation={navigation} />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  container: {
    backgroundColor: "#313131",
    flex: 1,
    justifyContent: "center",
  },
});

export default ClassScreen;
