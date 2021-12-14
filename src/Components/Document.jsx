import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { db, auth } from "../../firebase";
import EditName from "./EditName";
import styles from "../styles";

const Document = ({ setDocumentsIDS, documentID, folderID, navigation }) => {
  const [document, setDocument] = useState([]);
  const [edit, setEdit] = useState(false);

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

  const update = async (name) => {
    document.name = name;
    try {
      const documentsRef = db.collection("document").doc(documentID);
      await documentsRef.update(document);
      console.log("Updated Name");
    } catch (error) {
      console.log("error! at updating doc");
    }
    setEdit(false);
  };
  const checkEditValid = () => {
    if (auth.currentUser.uid === document.creatorID) {
      setEdit(true);
    }
  };

  return (
    <View>
      {edit ? (
        <EditName
          oldName={document.name}
          update={update}
          idToDelete={documentID}
          parentIDToDelete={folderID}
          setComponentIDS={setDocumentsIDS}
          type={"doc"}
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
