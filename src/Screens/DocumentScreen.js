import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InfoCard from "../Components/Cards/InfoCard";
import AmericanCard from "../Components/Cards/AmericanCard";
import QuestionCard from "../Components/Cards/QuestionCard";

const DocumentScreen = ({ navigation }) => {
  const documentID = navigation.getParam("documentID");
  // const [counter, setCounter] = useState(0);
  // const [documentsIDS, setDocumentsIDS] = useState([]);

  const cards = navigation.getParam("cards");
  const [counter, setCounter] = useState(0);

  const createNewCard = () => {
    // cards.push({ name: "כרטיס חדש " + cards.length, cards: [] });
    setCounter(counter + 1);
    const listOfCradsToDisplay = cards.map((card, key) => {
      if (card.type === InfoCard) {
        <InfoCard key={key} name={card.name} />;
      } else if (card.type === AmericanCard) {
        <AmericanCard key={key} name={card.name} />;
      } else if (card.type === QuestionCard) {
        <QuestionCard key={key} name={card.name} />;
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => createNewCard()}
        >
          <Text style={styles.buttonText}>צור כרטיס</Text>
        </TouchableOpacity>
        <View style={styles.cardsPlacement}>{listOfCradsToDisplay}</View>
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
