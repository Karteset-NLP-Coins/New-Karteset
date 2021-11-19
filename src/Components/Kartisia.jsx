import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Kartisia = ({ name, id, navigation }) => {

    return (
        <TouchableOpacity style={styles.btn} onPress={() => {navigation.navigate("Home")}}>
            <Text style={styles.btnText}>{name}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      btn: {
        backgroundColor: "#94C973",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 5,
      },
      btnText:{
        fontSize: 20,
      },
}) 

export default Kartisia;