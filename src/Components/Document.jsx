import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { db } from "../../firebase";
import EditName from "./EditName";

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
    setDocument(document);
    try {
      const documentsRef = db.collection("document").doc(documentID);
      await documentsRef.update(document);
      console.log("Updated Name");
    } catch (error) {
      console.log("error!");
    }
    setEdit(false);
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
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Document", {
              documentID: documentID,
            });
          }}
          onLongPress={() => setEdit(true)}
        >
          <Text style={styles.btnText}>{document.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 5,
  },
  btnText: {
    fontSize: 20,
  },
});

export default Document;
