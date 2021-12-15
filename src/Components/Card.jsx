import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { db, auth } from "../../firebase";
import styles from "../styles";
import EditCard from "./EditCard";

const Card = ({ cardID, documentID, setCardsIDS }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState({});
  const [loadedData, setLoadedData] = useState(false);
  const [editingCard, setEditingCard] = useState(false);
  const [pickedRightAnswer, setPickedRightAnswer] = useState(false);
  const [pickedAnswer, setPickedAnswer] = useState(false);

  // function to fetch the data from the DB, this function is running only at the start of the rendering.
  const fetchData = async () => {
    try {
      const cardIDRef = db.collection("card").doc(cardID);
      const data = await cardIDRef.get();
      const newCard = data.data();
      setCard(newCard);
      setLoadedData(true);
    } catch (error) {
      // alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // this function is to load new data to the card after editing it in the EditCard component
  const loadCardData = async (content = "", rightAnswer = "", answers = []) => {
    card.content = content;
    card.rightAnswer = rightAnswer;
    card.answers = answers;
    try {
      const cardsRef = db.collection("card").doc(cardID);
      await cardsRef.update(card);
      console.log("Updated card");
    } catch (error) {
      console.log("error updating card: ", error.message);
    }
    setCard(card);
    setEditingCard(false);
  };

  const checkAnswer = (answer) => {
    setPickedAnswer(true);
    if (answer === card.rightAnswer) {
      setPickedRightAnswer(true);
    } else {
      setPickedRightAnswer(false);
    }
  };
  const checkEditValid = () => {
    if (auth.currentUser.uid === card.creatorID) {
      setEditingCard(true);
    }
  };

  const infoContent = () => {
    return (
      <TouchableWithoutFeedback onLongPress={() => checkEditValid()}>
        <View style={updateStyles.textContainer}>
          <Text style={updateStyles.text}>{card.content}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const americanContent = () => {
    var answersToDisplay = [];
    for (const answer of card.answers) {
      if (answer !== "") {
        answersToDisplay.push(answer);
      }
    }
    card.answers = answersToDisplay;
    return (
      <TouchableWithoutFeedback onLongPress={() => checkEditValid()}>
        <View style={updateStyles.textContainer}>
          <View style={updateStyles.americanContent}>
            <Text style={updateStyles.text}>{card.content}</Text>
          </View>
          <View style={updateStyles.answers}>
            {card.answers.map((answer, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  style={
                    !pickedAnswer
                      ? updateStyles.americanAnswer
                      : pickedRightAnswer
                      ? updateStyles.correctAnswer
                      : updateStyles.wrongAnswer
                  }
                  onPress={() => checkAnswer(answer)}
                >
                  <Text adjustsFontSizeToFit style={styles.btnText}>
                    {answer}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const flipableContent = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => setIsFlipped(!isFlipped)}
        onLongPress={() => checkEditValid()}
      >
        {!isFlipped ? (
          <View style={updateStyles.textContainer} adjustsFontSizeToFit>
            <Text style={updateStyles.text}>{card.content}</Text>
          </View>
        ) : (
          <View style={updateStyles.textContainer}>
            <Text style={updateStyles.text}>{card.rightAnswer}</Text>
          </View>
        )}
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={updateStyles.container}>
      {editingCard ? (
        <View style={updateStyles.editCard}>
          <EditCard
            oldContent={card.content}
            oldRightAnswer={card.rightAnswer}
            oldAnswers={card.answers}
            loadCardData={loadCardData}
            cardID={cardID}
            documentID={documentID}
            setCardsIDS={setCardsIDS}
          />
        </View>
      ) : (
        <View>
          {!loadedData ? null : (
            <View style={updateStyles.textContainer} adjustsFontSizeToFit>
              {card.rightAnswer === ""
                ? infoContent()
                : card.answers.length > 1 && card.answers[0] !== ""
                ? americanContent()
                : flipableContent()}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const updateStyles = StyleSheet.create({
  americanAnswer: {
    backgroundColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    marginBottom: 5,
    paddingBottom: 5,
  },
  correctAnswer: {
    backgroundColor: "#4F9773",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    marginBottom: 5,
    paddingBottom: 5,
  },
  wrongAnswer: {
    backgroundColor: "#FA373B",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    marginBottom: 5,
    paddingBottom: 5,
  },

  americanContent: {
    bottom: 0,
    right: 0,
  },
  editCard: {
    width: 350,
    height: 550,
  },
  answers: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: 20,
    position: "absolute",
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: "#676767",
    width: 350,
    height: 550,
    paddingLeft: 25,
    paddingRight: 25,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: "#C9C9C9",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});

export default Card;
