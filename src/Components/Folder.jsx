import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase";
import EditName from "./EditName";

const Folder = ({ folderID, navigation }) => {
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
    setFolder(folder);
    try {
      const foldersRef = db.collection("folder").doc(folderID);
      await foldersRef.update(folder);
      console.log("Updated Name");
    } catch (error) {
      console.log("error!");
    }
    setEdit(false);
  };
  const deleteComponent = () => {
    console.log("Deleting!");
  };

  return (
    <View>
      {edit ? (
        <EditName
          oldName={folder.name}
          update={loadFolderData}
          deleteComponent={deleteComponent}
        />
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Folder", {
              folderID: folderID,
            });
          }}
          onLongPress={() => setEdit(true)}
        >
          <Text style={styles.btnText}>{folder.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 5,
  },
  btnText: {
    fontSize: 20,
  },
});

export default Folder;
