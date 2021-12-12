import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { db, auth } from "../../firebase";
import styles from "../styles";
import EditCard from "./EditCard";

const Card = ({ cardID }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState({});
  const [loadedData, setLoadedData] = useState(false);
  const [editingCard, setEditingCard] = useState(false);

  useEffect(() => {
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
    fetchData();
  }, []);

  const deleteCard = async () => {
    try {
      console.log("Trying to delete");
      await db.collection("card").doc(cardID).delete();
      console.log("Card deleted!");
    } catch (e) {
      console.log("Got an error");
    }
  };

  const loadCardData = (content = "", rightAnswer = "") => {
    card.content = content;
    card.rightAnswer = rightAnswer;
    setCard(card);
    setEditingCard(false);
  };

  const checkAnswer = (answer) => {
    if (answer === card.rightAnswer) {
      alert("Good job");
    } else {
      alert("Wrong Answer");
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
          <Text style={updateStyles.text}>{content}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const americanContent = () => {
    return (
      <View style={updateStyles.answers}>
        {card.answers.map((answer, id) => {
          return (
            <TouchableOpacity
              key={id}
              style={styles.btn}
              onPress={() => checkAnswer(answer)}
              onLongPress={() => checkEditValid()}
            >
              <Text adjustsFontSizeToFit style={styles.btnText}>
                {answer}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
            loadCardData={loadCardData}
            deleteCard={deleteCard}
          />
        </View>
      ) : (
        <View>
          {!loadedData ? null : (
            <View style={updateStyles.textContainer} adjustsFontSizeToFit>
              {card.rightAnswer !== ""
                ? flipableContent()
                : card.answers.length > 1
                ? americanContent()
                : infoContent()}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const updateStyles = StyleSheet.create({
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
    backgroundColor: "#B1D8B7",
    width: 350,
    height: 550,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
  editCard: {
    width: 350,
    height: 550,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});

export default Card;
