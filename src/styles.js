import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    position: "relative",
    top: -200,
  },
  btnText: {
    fontSize: 20,
    textAlign: "center",
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
    borderRadius: 15,
    marginBottom: 10,
    padding: 5,
  },
  componentBtn: {
    backgroundColor: "#94C973",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 5,
    padding: 5,
  },
  createBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    backgroundColor: "#94C973",
    height: 40,
    width: 150,
    borderRadius: 15,
    margin: 10,
    position: "absolute",
    right: 20,
    top: 10,
  },
  btnText: {
    fontSize: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
  inputView: {
    backgroundColor: "#94C973",
    borderRadius: 15,
    width: 300,
    height: 50,
    marginBottom: 10,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    padding: 10,
    flex: 1,
    fontSize: 20,
  },
  componentsPlacement: {
    flex: 1,
    position: "relative",
    top: 70,
  },
  checkBox: {
    paddingBottom: 10,
    right: 60,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  fgtPass: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 5,
  },
  regStyle: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  checkBoxTextStyle: {
    position: "absolute",
    left: 20,
  },
});

export default styles;
