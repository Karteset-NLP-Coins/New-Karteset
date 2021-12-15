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
import { db, auth, arrayUnion } from "../../firebase";

const DocumentScreen = ({ navigation }) => {
  const documentID = navigation.getParam("documentID");
  const [cardsIDS, setCardsIDS] = useState([]);
  const [creatingNewCard, setCreatingNewCard] = useState(false);
  const [card, setCard] = useState({});
  const [creatorID, setCreatorID] = useState("");

  const fetchData = async () => {
    try {
      const cardsIDRef = db.collection("document").doc(documentID);
      const data = await cardsIDRef.get();
      setCardsIDS(data.data().cardsIDS);
      setCreatorID(data.data().creatorID);
    } catch (error) {
      alert(error.message);
    }
  };

  const loadCardData = (content, rightAnswer, answers) => {
    const card = {
      content: content,
      answers: answers,
      rightAnswer: rightAnswer,
      creatorID: auth.currentUser.uid,
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
    // adding the card to the card collection
    const cardRef = await db.collection("card").add(card);
    const newCardId = cardRef.id;
    //adding the new card to the state
    cardsIDS.push(newCardId);
    setCardsIDS([...cardsIDS]);
    setCreatingNewCard(false); // set edit state to false

    // adding the cardID to the document doc
    const cardsIDSRef = db.collection("document").doc(documentID);
    await cardsIDSRef.update({
      cardsIDS: arrayUnion(newCardId),
    });
  };

  return (
    <View style={updateStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {creatorID === auth.currentUser.uid ? (
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => setCreatingNewCard(true)}
          >
            <Text style={styles.btnText}>צור כרטיס</Text>
          </TouchableOpacity>
        ) : null}
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
    backgroundColor: "#313131",
    flex: 1,
    justifyContent: "center",
  },
});

export default DocumentScreen;
