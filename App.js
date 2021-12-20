import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LogInScreen from "./src/Screens/LogInScreen";
import MyFoldersScreen from "./src/Screens/MyFoldersScreen";
import FolderScreen from "./src/Screens/FolderScreen";
import DocumentScreen from "./src/Screens/DocumentScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import ClassScreen from "./src/Screens/ClassScreen";
import MyClassesScreen from "./src/Screens/MyClassesScreen";
import SelectScreen from "./src/Screens/SelectScreen";
import ForgotPasswordScreen from "./src/Screens/ForgotPasswordScreen";

const navigator = createStackNavigator(
  {
    LogIn: LogInScreen,
    MyFolders: MyFoldersScreen,
    Folder: FolderScreen,
    Document: DocumentScreen,
    Register: RegistrationScreen,
    Class: ClassScreen,
    MyClasses: MyClassesScreen,
    Select: SelectScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    initialRouteName: "LogIn",
    defaultNavigationOptions: {
      title: "כרטסת",
      headerTintColor: "black",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#313131",
      },
      headerTintColor: "#C9C9C9",
      headerTitleStyle: {
        color: "#C9C9C9",
      },
    },
    navigationOptions: {
      title: "",
    },
  }
);

export default createAppContainer(navigator);
