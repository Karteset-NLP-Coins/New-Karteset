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
import styles from "../styles";
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
      const document = data.data();
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
    const cardRef = await db.collection("card").add(card);
    const newCardId = cardRef.id;
    const cardsIDSRef = db.collection("document").doc(documentID);
    const data = await cardsIDSRef.get();
    var document;
    try {
      document = data.data();
      setCardsIDS(document.cardsIDS);
    } catch (error) {}
    cardsIDS.push(newCardId);
    document = { ...document, cardsIDS: cardsIDS };
    cardsIDSRef.set(document);
    setCardsIDS(cardsIDS);
    setCreatingNewCard(false);
  };

  return (
    <View style={updateStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => setCreatingNewCard(true)}
        >
          <Text style={styles.btnText}>צור כרטיס</Text>
        </TouchableOpacity>
        {creatingNewCard ? (
          <EditCard loadCardData={loadCardData} />
        ) : (
          <View style={styles.componentsPlacement}>
            {cardsIDS.map((ID, key) => {
              return (
                <Card
                  key={key}
                  cardID={ID}
                  documentID={documentID}
                  setCardsIDS={setCardsIDS}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const updateStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

export default DocumentScreen;
