import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { db } from "../../firebase";


const Folder = ({ folderID, navigation, changeName }) => {
  const [folder, setFolder] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const foldersRef = db.collection("folder").doc(folderID);
        const data = await foldersRef.get();
        const newFolder = data.data().folder;
        setFolder(newFolder);
      } catch (error) {}
    };
    fetchData();
  }, []);



    return (
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => {navigation.navigate("Folder", {
          folderID: folderID,
          })}}
          onLongPress={() => changeName()}
        >
          <Text style={styles.btnText}>{folder.name}</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    flex: 1,
  },
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


export default Folder;