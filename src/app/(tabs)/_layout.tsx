import { Tabs } from 'expo-router'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" color={color} /> }} />
      <Tabs.Screen name="deck" options={{ title: 'Decks', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cards" color={color} /> }} />
      <Tabs.Screen name="quiz" options={{ title: 'Quiz', tabBarIcon: ({ color }) => <MaterialIcons name='quiz' color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <MaterialIcons name='settings' color={color} /> }} />
    </Tabs>
  )
}
