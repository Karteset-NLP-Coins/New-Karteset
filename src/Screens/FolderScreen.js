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
import { db, auth, arrayUnion } from "../../firebase";

const FolderScreen = ({ navigation }) => {
  const folderID = navigation.getParam("folderID");
  const prevClassName =
    navigation.dangerouslyGetParent().state.routes[
      navigation.dangerouslyGetParent().state.routes.length - 2
    ].routeName;
  const [documentsIDS, setDocumentsIDS] = useState([]);
  const [creatorID, setCreatorID] = useState("");
  const [showID, setShowID] = useState(false);

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
    <View style={styles.container}>
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
                  setDocumentsIDS={setDocumentsIDS}
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

export default FolderScreen;
