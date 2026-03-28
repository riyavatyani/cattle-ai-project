import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import ResultScreen from "../screens/ResultScreen";
import HelpScreen from "../screens/HelpScreen";

const Tab = createBottomTabNavigator();
const ScanStack = createStackNavigator();

function ScanStackScreen() {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen name="Camera" component={CameraScreen} />
      <ScanStack.Screen name="Result" component={ResultScreen} />
    </ScanStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen
          name="Scan"
          component={ScanStackScreen}
          options={{ headerShown: false }}
        />

        <Tab.Screen name="Help" component={HelpScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}