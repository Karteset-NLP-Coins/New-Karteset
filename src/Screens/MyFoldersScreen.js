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

const MyFoldersScreen = ({ navigation }) => {
  const currUserUid = auth.currentUser.uid;
  const [foldersIDS, setFoldersIDS] = useState([]);

  const fetchFolders = async () => {
    try {
      const foldersIDSRef = db.collection("users").doc(currUserUid);
      const data = await foldersIDSRef.get();
      const newFoldersIDS = data.data().foldersIDS;
      setFoldersIDS(newFoldersIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const createNewFolder = async () => {
    const folder = {
      name: "קלסר חדש",
      documentsIDS: [],
      creatorID: auth.currentUser.uid,
    };
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    const foldersIDSRef = db.collection("users").doc(currUserUid);
    const data = await foldersIDSRef.get();
    try {
      setFoldersIDS(data.data().foldersIDS);
    } catch (error) {
      console.log("Error: ", error.message, ", Probably no db created yet");
    }
    foldersIDS.push(newFolderId);
    const newObject = { ...data.data(), foldersIDS };
    foldersIDSRef.set(newObject);
    setFoldersIDS(foldersIDS);
  };

  return (
    <View style={updateStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => createNewFolder()}
        >
          <Text style={styles.btnText}>צור קלסר</Text>
        </TouchableOpacity>
        <View style={styles.componentsPlacement}>
          {foldersIDS.map((folderID, key) => {
            return (
              <Folder
                key={key}
                navigation={navigation}
                folderID={folderID}
                setFoldersIDS={setFoldersIDS}
                userID={currUserUid}
              />
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

export default MyFoldersScreen;
