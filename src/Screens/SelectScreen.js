import React, { useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles";
import OptionsMenu from "react-native-option-menu";
const more = require("../../icons/more.png");

const SelectScreen = ({ navigation }) => {
  // dynamically update header
  const updateHeader = () => {
    console.log("update header");
    navigation.setParams({
      headerRight: (
        <OptionsMenu
          button={more}
          buttonStyle={{
            width: 40,
            height: 25,
            margin: 7.5,
            resizeMode: "contain",
          }}
          options={["הכיתות שלי", "הקלסרים שלי", "סגור"]}
          actions={[
            () => navigation.navigate("MyClasses"),
            () => navigation.navigate("MyFolders"),
          ]}
        />
      ),
    });
  };

  useEffect(() => {
    updateHeader();
  }, []);

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
  headerRight: navigation.getParam("headerRight"),
});

export default SelectScreen;
