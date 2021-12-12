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
      name: "נושא חדש " + foldersIDS.length,
      documentsIDS: [],
      creatorID: auth.currentUser.uid,
    };
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    const foldersIDSRef = db.collection("users").doc(auth.currentUser.uid);
    const classFoldersIDSRef = db.collection("class").doc(classID);
    const folderData = await foldersIDSRef.get();
    const classFolderData = await classFoldersIDSRef.get();

    try {
      setFoldersIDS(folderData.data().foldersIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
    foldersIDS.push(newFolderId);
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
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

export default ClassScreen;
