import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { db, auth } from "../../firebase";
import EditName from "./EditName";
import styles from "../styles";

const Document = ({ documentID, navigation }) => {
  const [document, setDocument] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
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
    fetchData();
  }, []);

  const update = async (name) => {
    document.name = name;
    try {
      const documentsRef = db.collection("document").doc(documentID);
      await documentsRef.update(document);
      console.log("Updated Name");
    } catch (error) {
      console.log("error!");
    }
    setDocument(document);
    setEdit(false);
  };
  const checkEditValid = () => {
    if (auth.currentUser.uid === document.creatorID) {
      setEdit(true);
    }
  };

  const deleteComponent = () => {
    console.log("Deleting!");
  };
  return (
    <View>
      {edit ? (
        <EditName
          oldName={document.name}
          update={update}
          deleteComponent={deleteComponent}
        />
      ) : (
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
      )}
    </View>
  );
};

export default Document;
