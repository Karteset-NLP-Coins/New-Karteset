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
        const foldersRef = db.collection("folders").doc(currUserUid);
        const data = await foldersRef.get();
        setFolders(data.data().folders);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  const createNewFolder = () => {
    const foldersRef = db.collection("folders").doc(currUserUid);
    const folder = { name: "קלסר חדש " + folders.length, documents: [] };
    db.collection("documents").doc(currUserUid).set({
      documents: [],
    });
    folders.push(folder);
    foldersRef.set({ folders });
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
              <Folder
                key={key}
                name={folder.name}
                id={folder.id}
                navigation={navigation}
                documents={folder.documents}
              />
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
