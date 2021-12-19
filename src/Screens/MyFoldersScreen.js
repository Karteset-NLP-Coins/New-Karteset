import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import Folder from "../Components/Folder";
import styles from "../styles";
import { db, auth, arrayUnion } from "../../firebase";
import OptionsMenu from "react-native-option-menu";
const more = require("../../icons/more.png");

const MyFoldersScreen = ({ navigation }) => {
  const currUserUid = auth.currentUser.uid;
  const [foldersIDS, setFoldersIDS] = useState([]);
  const [addingNewFolder, setAddingNewFolder] = useState(false);
  const [folderCode, setFolderCode] = useState("");

  // dynamically update header
  const updateHeader = () => {
    console.log("update header");
    navigation.setParams({
      headerRight: (
        <OptionsMenu
          button={more}
          buttonStyle={{
            width: 80,
            height: 50,
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
    updateHeader();
  }, []);

  const copyObejctID = async (fromCollection, ID) => {
    try {
      const collectionRef = db.collection(fromCollection).doc(ID);
      const data = await collectionRef.get();
      const object = data.data();
      return object;
    } catch (e) {
      console.log(e);
    }
  };

  // this function will add new folder with given id to the user folders array.
  const addNewFolder = async (folderID) => {
    var folderRef;
    // check if id exists
    try {
      folderRef = await db.collection("folder").doc(folderID).get();
    } catch (error) {
      alert("קוד קלסר שגוי");
      console.log("folder does not exists");
      setAddingNewFolder(false);
      return;
    }
    // another check for another layer of protection
    if (!folderRef.exists) {
      alert("קוד קלסר שגוי");
      console.log("collection does not exists");
      setAddingNewFolder(false);
      return;
    }
    /* 
    from here its beginning to be a little more complicated. 
     here we need to do deep copy starting from the parent, going inside untill we get to the last child
     which is the cards.
     new we copy each card, from each different document, add to new cardIDS array and add that to the document
     then we need to copy each document and add it to the folderIDS 
     */
    const newFolder = folderRef.data(); // get the folder we want to copy
    const newDocumentsIDS = []; // init new documentsIDS array to store all the ids of the new documents
    newFolder.creatorID = currUserUid; // change the creatorID so the user can change the folder
    const documetsIDS = newFolder.documentsIDS; // get the documentsIDS from which we get all the ids we need to copy from.
    // for each id we need to take the document id
    for (const docID of documetsIDS) {
      const docObj = await copyObejctID("document", docID); // get the document
      docObj.creatorID = currUserUid;
      const cardsIDS = docObj.cardsIDS; // get the cardsIDS array
      const newCardsIDS = [];
      // for each id we need to take the card id
      for (const cardID of cardsIDS) {
        const cardObj = await copyObejctID("card", cardID); // get the card
        cardObj.creatorID = currUserUid;
        const cardRef = await db.collection("card").add(cardObj); // add the copied card to the card collection
        const newCardID = cardRef.id; // take the id we got
        newCardsIDS.push(newCardID); // add the id to the new cardsIDS array
      }
      docObj.cardsIDS = newCardsIDS; // after the loop we init the cardsIDS array with the new copied one
      const docRef = await db.collection("document").add(docObj); // add the copied document to the document collection
      const newDocID = docRef.id;
      newDocumentsIDS.push(newDocID); // add new id to the new documentsIDS array
    }
    newFolder.documentsIDS = newDocumentsIDS; // after the loop we init the documentsIDS array with the new copied one
    const newFolderRef = await db.collection("folder").add(newFolder); // add the new folder to the collection
    const newFolderID = newFolderRef.id;
    // from here we update the foldersIDS array in the user object
    const userRef = db.collection("users").doc(currUserUid);
    await userRef.update({
      foldersIDS: arrayUnion(newFolderID),
    });
    // change state
    setAddingNewFolder(false);
  };

  const createNewFolder = async () => {
    // create new folder
    const folder = {
      name: "קלסר חדש",
      documentsIDS: [],
      creatorID: auth.currentUser.uid,
    };
    // add new folder to folder collection
    const folderRef = await db.collection("folder").add(folder);
    const newFolderId = folderRef.id;
    // re-render with new folder
    foldersIDS.push(newFolderId);
    setFoldersIDS([...foldersIDS]);
    // add new folderID to the user
    const foldersIDSRef = db.collection("users").doc(currUserUid);
    await foldersIDSRef.update({
      foldersIDS: arrayUnion(newFolderId),
    });
  };

  return (
    <View style={styles.container}>
      {addingNewFolder ? (
        <View>
          <View style={updateStyles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder={"קוד קלסר"}
              placeholderTextColor="#C9C9C9"
              onChangeText={(folderCode) => {
                setFolderCode(folderCode);
              }}
            />
          </View>
          <TouchableOpacity
            style={updateStyles.btn}
            onPress={() => addNewFolder(folderCode)}
          >
            <Text style={styles.btnText}>סיים</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.topRightBtn}
              onPress={() => createNewFolder()}
            >
              <Text style={styles.btnText}>צור קלסר</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topLeftBtn}
              onPress={() => setAddingNewFolder(true)}
            >
              <Text style={styles.btnText}>הוסף קלסר</Text>
            </TouchableOpacity>
          </View>
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
      )}
    </View>
  );
};

const updateStyles = StyleSheet.create({
  inputView: {
    backgroundColor: "#676767",
    borderRadius: 15,
    height: 50,
    width: 300,
    marginBottom: 20,
    alignItems: "center",
    top: -10,
  },
  btn: {
    backgroundColor: "#CA3E47",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 15,
    top: 70,
    left: 100,
    position: "absolute",
  },
});

MyFoldersScreen.navigationOptions = ({ navigation }) => ({
  headerRight: navigation.getParam("headerRight"),
});

export default MyFoldersScreen;
