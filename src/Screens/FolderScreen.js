import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Document from "../Components/Document";
import ShowID from "../Components/ShowID";
import styles from "../styles";
import Dialog from "react-native-dialog";
import { deleteComponent } from "../deleteUtils";
import { db, auth, arrayUnion } from "../../firebase";
import OptionsMenu from "react-native-option-menu";
const more = require("../../icons/more.png");

const FolderScreen = ({ navigation }) => {
  const folderID = navigation.getParam("folderID");
  // get the last component name, if its class or my folders, this is if we need to show folder id
  const prevClassName =
    navigation.dangerouslyGetParent().state.routes[
      navigation.dangerouslyGetParent().state.routes.length - 2
    ].routeName;
  const [documentsIDS, setDocumentsIDS] = useState([]);
  const [creatorID, setCreatorID] = useState("");
  const [showID, setShowID] = useState(false);
  const [editDocument, setEditDocument] = useState(false);
  const [documentData, setDocumentData] = useState({});
  const [documentNewName, setDocumentNewName] = useState("");

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

  const fetchData = async () => {
    try {
      const documentsIDSRef = db.collection("folder").doc(folderID);
      const data = await documentsIDSRef.get();
      const folder = data.data();
      setDocumentsIDS(folder.documentsIDS);
      setCreatorID(data.data().creatorID);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    updateHeader();
  }, []);

  const createNewDocument = async () => {
    // create new document
    const document = {
      name: "כרטיסייה חדשה",
      cardsIDS: [],
      creatorID: auth.currentUser.uid,
    };
    // add new document tot the document collection
    const documentRef = await db.collection("document").add(document);
    const newDocumentId = documentRef.id;
    // re-render with new documentsIDS
    documentsIDS.push(newDocumentId);
    setDocumentsIDS([...documentsIDS]);
    // update the db with new id
    const documentsIDSRef = db.collection("folder").doc(folderID);
    await documentsIDSRef.update({
      documentsIDS: arrayUnion(newDocumentId),
    });
  };

  const loadDocumentData = async (documentID, document) => {
    const docuemntToEdit = {
      documentID: documentID,
      document: document,
    };
    setDocumentData(docuemntToEdit);
    setEditDocument(true);
  };

  const loadEditedDocument = async () => {
    documentData.document.name = documentNewName;
    try {
      const documentsRef = db
        .collection("document")
        .doc(documentData.documentID);
      await documentsRef.update(documentData.document);
      console.log("Updated Name");
    } catch (error) {
      console.log("error!");
    }
    setEditDocument(false);
  };

  const deleteDocument = () => {
    deleteComponent(documentData.documentID, folderID, setDocumentsIDS, "doc");
    setEditDocument(false);
  };

  return (
    <View style={styles.container}>
      {editDocument ? (
        <Dialog.Container visible={editDocument}>
          <Dialog.Title>עריכת כרטיסייה</Dialog.Title>
          <Dialog.Description>
            ערוך שם כרטיסייה או מחק את הכרטיסייה
          </Dialog.Description>
          <Dialog.Input
            onChangeText={(name) => {
              setDocumentNewName(name);
            }}
            defaultValue={documentData.document.name}
          />
          <Dialog.Button label="סיים" onPress={() => loadEditedDocument()} />
          <Dialog.Button label="מחק" onPress={() => deleteDocument()} />
        </Dialog.Container>
      ) : (
        <View>
          {showID ? (
            <ShowID ID={folderID} setShowID={setShowID} />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              {creatorID === auth.currentUser.uid ? (
                <View style={styles.topRow}>
                  <TouchableOpacity
                    style={
                      prevClassName === "Class"
                        ? updateStyles.topRightBtn
                        : styles.topRightBtn
                    }
                    onPress={() => createNewDocument()}
                  >
                    <Text style={styles.btnText}>צור כרטיסייה</Text>
                  </TouchableOpacity>
                  {prevClassName !== "Class" ? (
                    <TouchableOpacity
                      style={styles.topLeftBtn}
                      onPress={() => setShowID(true)}
                    >
                      <Text style={styles.btnText}>הצג קוד קלסר</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}
              <View style={styles.componentsPlacement}>
                {documentsIDS.map((documentID, key) => {
                  return (
                    <Document
                      key={key}
                      documentID={documentID}
                      folderID={folderID}
                      navigation={navigation}
                      loadDocumentData={loadDocumentData}
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

const updateStyles = StyleSheet.create({
  topRightBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    backgroundColor: "#CA3E47",
    height: 40,
    width: 150,
    borderRadius: 15,
    margin: 5,
    left: 115,
  },
});

FolderScreen.navigationOptions = ({ navigation }) => ({
  headerRight: navigation.getParam("headerRight"),
});

export default FolderScreen;
