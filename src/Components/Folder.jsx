import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { db, auth } from "../../firebase";
import EditName from "./EditName";
import styles from "../styles";

const Folder = ({ navigation, folderID, userID, setFoldersIDS }) => {
  const [folder, setFolder] = useState({});
  const [edit, setEdit] = useState(false);

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

  const loadFolderData = async (name) => {
    folder.name = name;
    try {
      const foldersRef = db.collection("folder").doc(folderID);
      await foldersRef.update(folder);
      console.log("Updated Name");
    } catch (error) {
      console.log("error!");
    }
    setEdit(false);
  };

  const checkEditValid = () => {
    if (auth.currentUser.uid === folder.creatorID) {
      setEdit(true);
    }
  };

  return (
    <View>
      {edit ? (
        <EditName
          oldName={folder.name}
          update={loadFolderData}
          idToDelete={folderID}
          parentIDToDelete={userID}
          setComponentIDS={setFoldersIDS}
          type={"folder"}
          setEdit={setEdit}
        />
      ) : (
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
      )}
    </View>
  );
};

export default Folder;
