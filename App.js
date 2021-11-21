import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import LogInScreen from "./src/Screens/LogInScreen";
import MyFoldersScreen from "./src/Screens/MyFoldersScreen";
import FolderScreen from "./src/Screens/FolderScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    LogIn: LogInScreen,
    MyFolders: MyFoldersScreen,
    Folder: FolderScreen,
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
