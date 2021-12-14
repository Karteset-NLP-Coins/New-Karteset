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
import { db, auth } from "../../firebase";

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
    const document = {
      name: "כרטיסייה חדשה",
      cardsIDS: [],
      creatorID: auth.currentUser.uid,
    };
    const documentRef = await db.collection("document").add(document);
    const newDocumentId = documentRef.id;
    const documentsIDSRef = db.collection("folder").doc(folderID);
    const data = await documentsIDSRef.get();
    var folder;
    try {
      folder = data.data();
      setDocumentsIDS(folder.documentsIDS);
    } catch (error) {}
    documentsIDS.push(newDocumentId);
    folder = { ...folder, documentsIDS: documentsIDS };
    documentsIDSRef.set(folder);
    setDocumentsIDS(documentsIDS);
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
