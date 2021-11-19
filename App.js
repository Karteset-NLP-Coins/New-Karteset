import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import LogInScreen from "./src/Screens/LogInScreen";
import MyDocumerntsScreen from "./src/Screens/MyDocumentsScreen";
import KartisiaScreen from "./src/Screens/KartisiaScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    LogIn: LogInScreen,
    MyDocuments: MyDocumerntsScreen,
    Kartisia: KartisiaScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "כרטסת",
      headerTintColor: "black",
      headerTitleAlign: "center",
    },
  }
);

export default createAppContainer(navigator);
