import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
 
  } from "react-native";


  const KartisQuestion = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setIsFlipped(!isFlipped)}>
            {!isFlipped ? 
            <View style={styles.textContainer} adjustsFontSizeToFit>
                <Text style={styles.text}>{props.questionContent}</Text>
            </View> :             
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.answerContent}</Text>
            </View>}
        </TouchableWithoutFeedback>
    </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      textContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#B1D8B7",
        width: 350,
        height: 500,
        borderRadius:10,
        borderWidth: 2,
        padding: 10
      },
      text: {
        fontSize: 20,
      }
  });

  export default KartisQuestion;