import React from "react";
import { Button, TouchableOpacity, Text, View } from "react-native";
import OptionsMenu from "react-native-option-menu";
import styles from "../styles";
import more from "../../icons/more.png";

const SelectScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>אנא בחרו לאן ברצונכם להיכנס</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("MyFolders")}
      >
        <Text style={styles.btnText}>הקלסרים שלי</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("MyClasses")}
      >
        <Text style={styles.btnText}>הכיתות שלי</Text>
      </TouchableOpacity>
    </View>
  );
};

SelectScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <OptionsMenu
      button={more}
      buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
      destructiveIndex={1}
      options={["קלסרים שלי", "כיתות שלי"]}
      actions={[
        navigation.navigate("MyClasses"),
        navigation.navigate("MyFolders"),
      ]}
    />
  ),
});

export default SelectScreen;
