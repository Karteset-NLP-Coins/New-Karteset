import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import LogInScreen from "./src/Screens/LogInScreen";
import MyFoldersScreen from "./src/Screens/MyFoldersScreen";
import FolderScreen from "./src/Screens/FolderScreen";
import DocumentScreen from "./src/Screens/DocumentScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import ClassScreen from "./src/Screens/ClassScreen";
import MyClassesScreen from "./src/Screens/MyClassesScreen";
import SelectScreen from "./src/Screens/SelectScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    LogIn: LogInScreen,
    MyFolders: MyFoldersScreen,
    Folder: FolderScreen,
    Document: DocumentScreen,
    Register: RegistrationScreen,
    Class: ClassScreen,
    MyClasses: MyClassesScreen,
    Select: SelectScreen,
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
