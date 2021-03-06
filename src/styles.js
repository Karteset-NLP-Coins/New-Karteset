import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "relative",
    top: -100,
    fontSize: 23,
    color: "#C9C9C9",
  },
  btnText: {
    fontSize: 20,
    textAlign: "center",
    color: "#C9C9C9",
  },
  btn: {
    backgroundColor: "#CA3E47",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    borderRadius: 15,
    marginBottom: 10,
    padding: 5,
  },
  componentBtn: {
    backgroundColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    marginBottom: 5,
    paddingBottom: 5,
  },
  topRightBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    backgroundColor: "#CA3E47",
    height: 40,
    width: 150,
    borderRadius: 15,
    margin: 5,
    left: -40,
  },

  topLeftBtn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
    backgroundColor: "#CA3E47",
    height: 40,
    width: 150,
    borderRadius: 15,
    margin: 5,
    right: -40,
  },
  btnText: {
    fontSize: 20,
    color: "#C9C9C9",
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: "#C9C9C9",
  },
  inputView: {
    backgroundColor: "#676767",
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
    color: "#C9C9C9",
  },
  componentsPlacement: {
    position: "absolute",
    flex: 1,
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
    width: 415,
  },
  fgtPass: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 5,
  },
  regStyle: {
    flex: 1,
    backgroundColor: "#313131",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  checkBoxTextStyle: {
    position: "absolute",
    left: 20,
    color: "#EDEDED",
  },
  topRow: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 0,
  },
});

export default styles;
