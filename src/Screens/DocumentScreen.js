import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../Components/Cards/Card";

const DocumentScreen = ({ navigation }) => {
  const documentID = navigation.getParam("documentID");

  const [cardsIDS, setCardsIDS] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsIDRef = db.collection("document").doc(documentID);
        const data = await cardsIDRef.get();
        const document = data.data().document;
        setCardsIDS(document.cardsIDS);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  const createNewCard = async () => {
    const card = {
      name: "כרטיס חדש " + cardsIDS.length,
      content: "This is content",
      answers: [],
    };
    const cardRef = await db.collection("card").add({ card });
    const newCardId = cardRef.id;
    const cardsIDSRef = db.collection("document").doc(documentID);
    const data = await cardsIDSRef.get();
    var document;
    try {
      document = data.data().document;
      setCardsIDS(document.cardsIDS);
    } catch (error) {}
    cardsIDS.push(newCardId);
    document = { ...document, cardsIDS: cardsIDS };
    cardsIDSRef.set({ document });
    setCardsIDS(cardsIDS);
    setCounter(counter + 1);
  };

  // continue from here
  // need to edit card jsx file to handle ids and fetch data from there
  const listOfCardsToDisplay = cardsIDS.map((ID, key) => {
    <Card key={key} cardID={ID} />;
  });
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => createNewCard()}
        >
          <Text style={styles.buttonText}>צור כרטיס</Text>
        </TouchableOpacity>
        <View style={styles.cardsPlacement}>{listOfCardsToDisplay}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsPlacement: {
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

export default DocumentScreen;
