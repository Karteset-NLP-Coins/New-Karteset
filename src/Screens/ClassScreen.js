import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import Folder from "../Components/Folder";
import ShowID from "../Components/ShowID";
import styles from "../styles";
import Dialog from "react-native-dialog";
import { deleteComponent } from "../deleteUtils";
import { db, auth, arrayUnion } from "../../firebase";
import OptionsMenu from "react-native-option-menu";
const more = require("../../icons/more.png");

const ClassScreen = ({ navigation }) => {
  const classID = navigation.getParam("classID");
  const [creatorID, setCreatorID] = useState("");
  const [foldersIDS, setFoldersIDS] = useState([]);
  const [showID, setShowID] = useState(false);
  const [editFolder, setEditFolder] = useState(false);
  const [folderData, setFolderData] = useState({});
  const [folderNewName, setFolderNewName] = useState("");

  // dynamically update header
  const updateHeader = () => {
    console.log("update header");
    navigation.setParams({
      headerRight: (
        <OptionsMenu
          button={more}
          buttonStyle={{
            width: 40,
            height: 25,
            margin: 7.5,
            resizeMode: "contain",
          }}
          options={["הכיתות שלי", "הקלסרים שלי", "סגור"]}
          actions={[
            () => navigation.navigate("MyClasses"),
            () => navigation.navigate("MyFolders"),
          ]}
        />
      ),
    });
  };

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
    updateHeader();
  }, []);

  const loadFolderData = async (folderID, folder) => {
    const folderToEdit = {
      folderID: folderID,
      folder: folder,
    };
    setFolderData(folderToEdit);
    setEditFolder(true);
  };

  const loadEditedFolder = async () => {
    folderData.folder.name = folderNewName;
    try {
      const foldersRef = db.collection("folder").doc(folderData.folderID);
      await foldersRef.update(folderData.folder);
      console.log("Updated Name");
    } catch (error) {
      console.log("error!");
    }
    setEditFolder(false);
  };

  const deleteFolder = () => {
    deleteComponent(folderData.folderID, classID, setFoldersIDS, "folder");
    setEditFolder(false);
  };

  return (
    <View style={styles.container}>
      {editFolder ? (
        <Dialog.Container visible={editFolder}>
          <Dialog.Title>עריכת קלסר</Dialog.Title>
          <Dialog.Description>ערוך שם קלסר או מחק את הקלסר</Dialog.Description>
          <Dialog.Input
            onChangeText={(name) => {
              setFolderNewName(name);
            }}
            defaultValue={folderData.folder.name}
          />
          <Dialog.Button label="סיים" onPress={() => loadEditedFolder()} />
          <Dialog.Button label="מחק" onPress={() => deleteFolder()} />
        </Dialog.Container>
      ) : (
        <View>
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
                    <Folder
                      key={key}
                      folderID={folderID}
                      navigation={navigation}
                      loadFolderData={loadFolderData}
                    />
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

ClassScreen.navigationOptions = ({ navigation }) => ({
  headerRight: navigation.getParam("headerRight"),
});

export default ClassScreen;
