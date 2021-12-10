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
  const [foldersIDS, setFoldersIDS] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foldersIDSRef = db.collection("foldersIDS").doc(currUserUid);
        const data = await foldersIDSRef.get();
        const newFoldersIDS = data.data().foldersIDS;
        setFoldersIDS(newFoldersIDS);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const createNewFolder = async () => {
    const folder = {
      name: "קלסר חדש " + foldersIDS.length,
      documentsIDS: [],
    };
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    const foldersIDSRef = db.collection("foldersIDS").doc(currUserUid);
    const data = await foldersIDSRef.get();
    try {
      setFoldersIDS(data.data().foldersIDS);
    } catch (error) {}
    foldersIDS.push(newFolderId);
    foldersIDSRef.set({ foldersIDS });
    setFoldersIDS(foldersIDS);
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
