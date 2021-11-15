import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import LogInScreen from "./src/Screens/LogInScreen";
import MyDocumerntsScreen from "./src/Screens/MyDocumentsScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    LogIn: LogInScreen,
    MyDocuments: MyDocumerntsScreen,
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
