import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { db } from "../../firebase"
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
        const newCard = data.data().card;
        setCard(newCard);
        setLoadedData(true);
      } catch (error) {
        // alert(error.message);
      }
    };
    fetchData();
  }, []);


  const loadCardData = (cardName, content, rightAnswer) => {
    card.name = cardName;
    card.content = content;
    card.rightAnswer = rightAnswer;
    setCard(card);
    setEditingCard(false);
  } 

  const checkAnswer = (answer) => {
    if (answer === card.rightAnswer) {
      alert("Good job");
    } else {
      alert("Wrong Answer");
    }
  };

  const infoContent = () => {
    return (
    <TouchableWithoutFeedback  onLongPress={() => setEditingCard(true)}>        
      <View style={styles.textContainer}>
        <Text style={styles.text}>{card.content}</Text>
      </View>
    </TouchableWithoutFeedback>
    );
  }
  const americanContent = () => {
    return (<View style={styles.answers}>
        {card.answers.map((answer, id) => {
          return (
            <TouchableOpacity
              key={id}
              style={styles.btn}
              onPress={() => checkAnswer(answer)}
              onLongPress={() => setEditingCard(true)}
            >
              <Text adjustsFontSizeToFit style={styles.btnText}>
                {answer}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>);
  }
  const flipableContent = () => {
    return (
        <TouchableWithoutFeedback 
        onPress={() => setIsFlipped(!isFlipped)}
        onLongPress={() => setEditingCard(true)}
        >
            {!isFlipped ? 
            <View style={styles.textContainer} adjustsFontSizeToFit>
                <Text style={styles.text}>{card.content}</Text>
            </View> :
            <View style={styles.textContainer}>
                <Text style={styles.text}>{card.rightAnswer}</Text>
            </View>}
        </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.container}>
      {editingCard ?
      <View style={styles.editCard}> 
        <EditCard 
          oldContent={card.content} 
          oldName={card.name} 
          oldRightAnswer={card.rightAnswer} 
          loadCardData={loadCardData}
        /> 
      </View> 
      : 
      <View>
      {!loadedData ? null :
      <View style={styles.textContainer} adjustsFontSizeToFit>
        {card.rightAnswer !== "" ?
            flipableContent() :
        (card.answers.length > 1 ?
            americanContent() :
        infoContent())}
      </View>}
      </View>
      }   
    </View>
  );
};

const styles = StyleSheet.create({
  editCard:{
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
  answers: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: 20,
    position: "absolute",
  },
  btn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 3,
    padding: 5,
  },
  btnText: {
    fontSize: 20,
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
});

export default Card;