import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from "react-native";



  const KartisAmerican = (props) => {
    const checkAnswer = (answer) => {
        if (answer === props.rightAnswer) {
           alert("Good job")
        }
        else {
            alert("Dumb fuck");
        }
    }

    return (
    <View style={styles.container}>
        <View style={styles.textContainer} adjustsFontSizeToFit>
            <Text style={styles.text}>
                {props.questionContent}
                </Text>
                <View style={styles.answers}>
                    {props.answers.map((answer, id) => {
                       return(
                        <TouchableOpacity 
                        key={id} 
                        style={styles.btn} 
                        onPress={() => checkAnswer(answer)}
                        >
                            <Text adjustsFontSizeToFit style={styles.btnText}>{answer}</Text>
                        </TouchableOpacity>
                       );
                    })}
             </View>
        </View>                   
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
      answers: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        position:"absolute"
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
        padding: 5
      },
      btnText:{
        fontSize: 20,
      },
      textContainer: {
        alignItems: "center",
        backgroundColor:"#B1D8B7",
        width: 350,
        height: 550,
        borderRadius: 10,
        borderWidth: 2,
        paddingLeft: 25,
        paddingRight: 25
      },
      text: {
        marginTop: 10,
        fontSize: 20,
      }
  });

  export default KartisAmerican;