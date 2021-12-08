import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../Components/Card";
import EditCard from "../Components/EditCard";
import { db } from "../../firebase";

const DocumentScreen = ({ navigation }) => {
  const documentID = navigation.getParam("documentID");
  const [cardsIDS, setCardsIDS] = useState([]);
  const [creatingNewCard, setCreatingNewCard] = useState(false);
  const [card, setCard] = useState({});

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

  const loadCardData = (name, content, rightAnswer) => {
    const card = {
      name: name,
      content: content,
      answers: [],
      rightAnswer: rightAnswer,
    };
    setCard(card);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (creatingNewCard) {
      createNewCard();
    }
  }, [card]);

  const createNewCard = async () => {
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
    setCreatingNewCard(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => setCreatingNewCard(true)}
        >
          <Text style={styles.buttonText}>צור כרטיס</Text>
        </TouchableOpacity>
        {creatingNewCard ? (
          <EditCard loadCardData={loadCardData} />
        ) : (
          <View style={styles.cardsPlacement}>
            {cardsIDS.map((ID, key) => {
              return <Card key={key} cardID={ID} navigation={navigation} />;
            })}
          </View>
        )}
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
