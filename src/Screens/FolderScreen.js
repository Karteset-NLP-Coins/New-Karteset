import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Document from "../Components/Document";
import { db, auth } from "../../firebase";

const FolderScreen = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const [documents, setDocuments] = useState([]);
  const currUserUid = auth.currentUser.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentsRef = db.collection("documents").doc(currUserUid);
        const data = await documentsRef.get();
        setDocuments(data.data().documents);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  const createNewDocument = () => {
    const documentsRef = db.collection("documents").doc(currUserUid);
    const document = { name: "כרטיסייה חדשה " + documents.length, cards: [] };
    db.collection("cards").doc(currUserUid).set({
      cards: [],
    });
    documents.push(document);
    documentsRef.set({ documents });
    setCounter(counter + 1);
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
          {documents.map((document, key) => {
            return (
              <Document
                key={key}
                name={document.name}
                id={document.id}
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
