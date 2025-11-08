import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView } from "moti";
import DeckCards from "@/app/components/ui/DeckCards";
import Header from "@/app/components/layout/Header";
import Feather from "@expo/vector-icons/Feather";

export default function DeckScreen() {
  const [activeTab, setActiveTab] = useState<"your" | "discover">("your");

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Header className="mb-4 mt-1">
        <Feather name="search" size={26} color="#292524" />
      </Header>
      {/* Segmented Control */}
      <View className="flex-row justify-center gap-2 mb-6 px-4">
        <TouchableOpacity
          onPress={() => setActiveTab("your")}
          className={`flex-1 py-3 rounded-full border-2 ${
            activeTab === "your"
              ? "bg-stone-200 border-transparent"
              : "border-stone-200"
          }`}
        >
          <Text
            className={`text-center font-medium ${
              activeTab === "your" ? "text-stone-800" : "text-stone-500"
            }`}
          >
            Your Decks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("discover")}
          className={`flex-1 py-3 rounded-full border-2 ${
            activeTab === "discover"
              ? "bg-stone-200 border-transparent"
              : "border-stone-200"
          }`}
        >
          <Text
            className={`text-center font-medium ${
              activeTab === "discover" ? "text-stone-800" : "text-stone-500"
            }`}
          >
            Discover Decks
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {activeTab === "your" ? (
          <DeckCards />
        ) : (
          <MotiView
            key="discover"
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ type: "timing", duration: 300 }}
            className="items-center"
          >
            <Text className="text-lg font-semibold">Discover Decks List</Text>
          </MotiView>
        )}
      </View>
    </SafeAreaView>
  );
}
