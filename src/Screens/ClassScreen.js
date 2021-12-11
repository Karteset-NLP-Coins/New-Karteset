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

const ClassScreen = ({ navigation }) => {
  const classID = navigation.getParam("classID");
  const [foldersIDS, setFoldersIDS] = useState([]);

  const fetchFolders = async () => {
    try {
      const foldersIDSRef = db.collection("class").doc(classID);
      const data = await foldersIDSRef.get();
      setFoldersIDS(data.data().foldersIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
  };

  const createNewFolder = async () => {
    const folder = {
      name: "נושא חדש " + foldersIDS.length,
      documentsIDS: [],
    };
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    const foldersIDSRef = db.collection("users").doc(auth.currentUser.uid);
    console.log("user: ", auth.currentUser.id);
    const classFoldersIDSRef = db.collection("class").doc(classID);
    const folderData = await foldersIDSRef.get();
    const classFolderData = await classFoldersIDSRef.get();

    try {
      setFoldersIDS(folderData.data().foldersIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
    foldersIDS.push(newFolderId);
    console.log("folder data: ", folderData.data());
    console.log("classFolder Data: ", classFolderData.data());
    const newFolder = { ...folderData.data(), foldersIDS };
    const newClassFolder = { ...classFolderData.data(), foldersIDS };
    foldersIDSRef.set(newFolder);
    classFoldersIDSRef.set(newClassFolder);
    setFoldersIDS(foldersIDS);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <View style={updateStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.btnText} onPress={() => createNewFolder()}>
            צור נושא
          </Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

export default ClassScreen;
