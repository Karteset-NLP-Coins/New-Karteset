import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Folder from "../Components/Folder";
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
      name: "קלסר חדש " + foldersIDS.length,
      documentsIDS: [],
    };
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    const foldersIDSRef = db.collection("users").doc(classID);
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.buttonText} onPress={() => createNewFolder()}>
            צור קלסר
          </Text>
        </TouchableOpacity>
        <View style={styles.foldersPlacement}>
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

const styles = StyleSheet.create({
  documentsPlacement: {
    flex: 1,
    position: "relative",
    top: 70,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
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
    right: 10,
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

export default ClassScreen;
