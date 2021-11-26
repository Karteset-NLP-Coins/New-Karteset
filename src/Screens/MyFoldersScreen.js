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

const MyFoldersScreen = ({ navigation }) => {
  const currUserUid = auth.currentUser.uid;
  const [folders, setFolders] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foldersToRender = [];
        const foldersIDSRef = db.collection("foldersIDS").doc(currUserUid);
        const data = await foldersIDSRef.get();
        const foldersIDS = data.data().foldersIDS;
        for (const folderID of foldersIDS) {
          const folderRef = db.collection("folder").doc(folderID);
          const folderData = await folderRef.get();
          const folder = folderData.data().folder;
          foldersToRender.push(folder);
        }
        setFolders(foldersToRender);
      } catch (error) {
        // alert(error.message);
      }
    };
    fetchData();
  }, []);

  const createNewFolder = async () => {
    const folder = {
      name: "קלסר חדש " + folders.length,
      documentsIDS: [],
    };
    folders.push(folder);
    setFolders(folders);
    const folderRef = await db.collection("folder").add({ folder });
    const newFolderId = folderRef.id;
    const foldersIDSRef = db.collection("foldersIDS").doc(currUserUid);
    const data = await foldersIDSRef.get();
    let foldersIDS = [];
    try {
      foldersIDS = data.data().foldersIDS;
    } catch (error) {}
    foldersIDS.push(newFolderId);
    foldersIDSRef.set({ foldersIDS });
    setCounter(counter + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.buttonText} onPress={() => createNewFolder()}>
            צור קלסר
          </Text>
        </TouchableOpacity>
        <View style={styles.foldersPlacement}>
          {folders.map((folder, key) => {
            return (
              <Folder key={key} name={folder.name} navigation={navigation} />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  foldersPlacement: {
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

export default MyFoldersScreen;
