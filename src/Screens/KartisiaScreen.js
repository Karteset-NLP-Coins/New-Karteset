import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Kartisia from "../Components/Kartisia";

const KartisiaScreen = ({ navigation }) => {
  const kartisim = navigation.getParam("kartisim");
  const [counter, setCounter] = useState(0);

  const createNewKartisia = () => {
    kartisim.push({ name: "כרטיסייה חדשה " + kartisim.length });
    setCounter(counter + 1);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => createNewKartisia()}
        >
          <Text style={styles.buttonText}>צור כרטיסייה</Text>
        </TouchableOpacity>
        <View style={styles.kartisimPlacement}>
          {kartisim.map((kartisia, key) => {
            return (
              <Kartisia
                key={key}
                name={kartisia.name}
                id={kartisia.id}
                navigation={navigation}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  kartisimPlacement: {
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

export default KartisiaScreen;
