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

  // use this function to fetch the data from the db
  const fetchData = async () => {
    try {
      const foldersIDSRef = db.collection("foldersIDS").doc(currUserUid);
      const data = await foldersIDSRef.get();
      const newFoldersIDS = data.data().foldersIDS;
      setFoldersIDS(newFoldersIDS);
    } catch (error) {}
  };

  // this will only occur once and only when the screen loads first time.
  useEffect(() => {
    fetchData();
  }, []);

  const createNewFolder = async () => {
    // create the folder we want to add to the db
    const folder = {
      name: "קלסר חדש " + foldersIDS.length,
      documentsIDS: [],
    };
    // addding the folder
    const folderRef = await db.collection("folder").add({ folder });
    // getting the new folder id we generated
    const newFolderId = folderRef.id;
    // get the foldersIDS ref
    const foldersIDSRef = db.collection("foldersIDS").doc(currUserUid);
    // get the data of the folderIDS and wait for it
    const data = await foldersIDSRef.get();
    try {
      // set new folderIDS
      setFoldersIDS(data.data().foldersIDS);
    } catch (error) {}
    // push the new id to the array we display
    foldersIDS.push(newFolderId);
    // wait for the db to set the new folderIDS
    await foldersIDSRef.set({ foldersIDS });
    // re-render the folderIDS
    setFoldersIDS([...foldersIDS]);
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
