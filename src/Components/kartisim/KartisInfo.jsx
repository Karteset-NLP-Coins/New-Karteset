import React from "react";
import {
    StyleSheet,
    Text,
    View,
  } from "react-native";

  const KartisInfo = (props) => {
    return(
    <View style={styles.container}>
      <View style={styles.textContainer}>        
        <Text style={styles.text}>{props.content}</Text>
      </View>
    </View>
    );
  }
  
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


  export default KartisInfo;