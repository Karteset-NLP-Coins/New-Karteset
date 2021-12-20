import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Document from "../Components/Document";
import { db } from "../../firebase";

const FolderScreen = ({ navigation }) => {
  // get unique folderId to display
  const folderID = navigation.getParam("folderID");
  const [documentsIDS, setDocumentsIDS] = useState([]);

  const fetchData = async () => {
    try {
      const documentsIDSRef = db.collection("folder").doc(folderID);
      const data = await documentsIDSRef.get();
      const folder = data.data().folder;
      setDocumentsIDS(folder.documentsIDS);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createNewDocument = async () => {
    // create the doc
    const document = {
      name: "כרטיסייה חדשה " + documentsIDS.length,
      cardsIDS: [],
    };
    // addding the doc
    const documentRef = await db.collection("document").add({ document });
    // getting the new doc id we generated
    const newDocumentId = documentRef.id;
    // get the newDocumentId ref
    const documentsIDSRef = db.collection("folder").doc(folderID);
    // get the data of the documentsIDS and wait for it
    const data = await documentsIDSRef.get();
    var folder;
    try {
      // set new documentsIDS
      folder = data.data().folder;
      setDocumentsIDS([...folder.documentsIDS]);
    } catch (error) {}
    documentsIDS.push(newDocumentId);
    folder = { ...folder, documentsIDS: documentsIDS };
    await documentsIDSRef.set({ folder });
    setDocumentsIDS([...documentsIDS]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => createNewDocument()}
        >
          <Text style={styles.buttonText}>צור כרטיסייה</Text>
        </TouchableOpacity>
        <View style={styles.documentsPlacement}>
          {documentsIDS.map((documentID, key) => {
            return (
              <Document
                key={key}
                documentID={documentID}
                navigation={navigation}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  documentsPlacement: {
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

export default FolderScreen;
