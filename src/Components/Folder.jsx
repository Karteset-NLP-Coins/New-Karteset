import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { db, auth } from "../../firebase";
import styles from "../styles";

const Folder = ({ navigation, folderID, loadFolderData }) => {
  const [folder, setFolder] = useState({});

  const fetchData = async () => {
    try {
      const foldersRef = db.collection("folder").doc(folderID);
      const data = await foldersRef.get();
      const newFolder = data.data();
      setFolder(newFolder);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkEditValid = () => {
    if (auth.currentUser.uid === folder.creatorID) {
      loadFolderData(folderID, folder);
    }
  };

  return (
    <TouchableOpacity
      style={styles.componentBtn}
      onPress={() => {
        navigation.navigate("Folder", {
          folderID: folderID,
        });
      }}
      onLongPress={() => checkEditValid()}
    >
      <Text style={styles.btnText}>{folder.name}</Text>
    </TouchableOpacity>
  );
};

export default Folder;
