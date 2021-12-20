import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { db } from "../../firebase";

const Document = ({ documentID, navigation }) => {
  const [document, setDocument] = useState([]);

  const fetchData = async () => {
    try {
      const documentIDRef = db.collection("document").doc(documentID);
      const data = await documentIDRef.get();
      const newDocument = data.data().document;
      setDocument(newDocument);
    } catch (error) {
      // alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        navigation.navigate("Document", {
          documentID: documentID,
        });
      }}
    >
      <Text style={styles.btnText}>{document.name}</Text>
    </TouchableOpacity>
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
