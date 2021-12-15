import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Document from "../Components/Document";
import styles from "../styles";
import { db, auth, arrayUnion } from "../../firebase";

const FolderScreen = ({ navigation }) => {
  const folderID = navigation.getParam("folderID");
  const [documentsIDS, setDocumentsIDS] = useState([]);
  const [creatorID, setCreatorID] = useState("");

  useEffect(() => {
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
    fetchData();
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

  return (
    <View style={updateStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {creatorID === auth.currentUser.uid ? (
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => createNewDocument()}
          >
            <Text style={styles.btnText}>צור כרטיסייה</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.componentsPlacement}>
          {documentsIDS.map((documentID, key) => {
            return (
              <Document
                key={key}
                documentID={documentID}
                folderID={folderID}
                navigation={navigation}
                setDocumentsIDS={setDocumentsIDS}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  container: {
    backgroundColor: "#313131",
    flex: 1,
    justifyContent: "center",
  },
});

export default FolderScreen;
