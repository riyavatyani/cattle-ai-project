import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import ResultScreen from "../screens/ResultScreen";
import HelpScreen from "../screens/HelpScreen";
import AllScansScreen from "../screens/AllScansScreen";

const Tab = createBottomTabNavigator();
const ScanStack = createStackNavigator();
const HomeStack = createStackNavigator();  // ✅ new

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: true, title: "Home" }}
      />
      <HomeStack.Screen
        name="AllScans"
        component={AllScansScreen}
        options={{ headerShown: true, title: "All Scans" }}
      />
    </HomeStack.Navigator>
  );
}

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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#2e7d32",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#dcedc8",
            height: 100,
            paddingBottom: 30,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Scan") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "Help") {
              iconName = focused ? "help-circle" : "help-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >

        {/* ✅ Home stack includes AllScans */}
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Scan"
          component={ScanStackScreen}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Help"
          component={HelpScreen}
          options={{ headerShown: true }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}