import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F4F1EB",
          paddingHorizontal: 10,
          height: 80,
          paddingBottom: 30,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "view-dashboard" : "view-dashboard-outline"}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="deck/deck"
        options={{
          title: "Decks",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cards" : "cards-outline"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "clipboard" : "clipboard-outline"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
