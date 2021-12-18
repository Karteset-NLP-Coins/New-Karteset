import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Folder from "../Components/Folder";
import ShowID from "../Components/ShowID";
import styles from "../styles";
import { db, auth, arrayUnion } from "../../firebase";

const ClassScreen = ({ navigation }) => {
  const classID = navigation.getParam("classID");
  const [creatorID, setCreatorID] = useState("");
  const [foldersIDS, setFoldersIDS] = useState([]);
  const [showID, setShowID] = useState(false);

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
    // create new folder
    const folder = {
      name: "נושא חדש",
      documentsIDS: [],
      creatorID: auth.currentUser.uid,
    };
    // adding new folder to folder collection
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    foldersIDS.push(newFolderId); // adding new folderID to folderIDS
    setFoldersIDS([...foldersIDS]); // re-render with new folder

    // adding new folder to class db
    const classFoldersIDSRef = db.collection("class").doc(classID);
    await classFoldersIDSRef.update({
      foldersIDS: arrayUnion(newFolderId),
    });
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <View style={styles.container}>
      {showID ? (
        <ShowID ID={classID} setShowID={setShowID} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {creatorID === auth.currentUser.uid ? (
            <View style={styles.topRow}>
              <TouchableOpacity
                style={styles.topRightBtn}
                onPress={() => createNewFolder()}
              >
                <Text style={styles.btnText}>צור נושא</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.topLeftBtn}
                onPress={() => setShowID(true)}
              >
                <Text style={styles.btnText}>הצג קוד כיתה</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.componentsPlacement}>
            {foldersIDS.map((folderID, key) => {
              return (
                <Folder key={key} folderID={folderID} navigation={navigation} />
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ClassScreen;
