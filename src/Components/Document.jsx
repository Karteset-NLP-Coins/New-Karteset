import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { db, auth } from "../../firebase";
import styles from "../styles";

const Document = ({ documentID, navigation, loadDocumentData }) => {
  const [document, setDocument] = useState({});

  const fetchData = async () => {
    try {
      const documentIDRef = db.collection("document").doc(documentID);
      const data = await documentIDRef.get();
      const newDocument = data.data();
      setDocument(newDocument);
    } catch (error) {
      // alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkEditValid = () => {
    if (auth.currentUser.uid === document.creatorID) {
      loadDocumentData(documentID, document);
    }
  };

  return (
    <TouchableOpacity
      style={styles.componentBtn}
      onPress={() => {
        navigation.navigate("Document", {
          documentID: documentID,
        });
      }}
      onLongPress={() => checkEditValid()}
    >
      <Text style={styles.btnText}>{document.name}</Text>
    </TouchableOpacity>
  );
};

export default Document;
