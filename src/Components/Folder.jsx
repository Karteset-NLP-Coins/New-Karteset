import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from "../../firebase";


const Folder = ({ folderID, navigation }) => {
  const [folder, setFolder] = useState({});
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
        <TouchableOpacity style={styles.btn} onPress={() => {navigation.navigate("Folder", {
          folderID: folderID,
        })}}>
            <Text style={styles.btnText}>{folder.name}</Text>
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


export default Folder;