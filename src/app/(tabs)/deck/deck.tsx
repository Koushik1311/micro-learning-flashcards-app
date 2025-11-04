import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView, AnimatePresence } from "moti";
import { useDecks } from "@/query/decks";
import DeckCards from "@/app/components/ui/DeckCards";

export default function DeckScreen() {
  const [activeTab, setActiveTab] = useState<"your" | "discover">("your");

  return (
    <SafeAreaView className="flex-1 bg-[#F4F1EB] px-4 pt-4">
      {/* Segmented Control */}
      <View className="flex-row justify-center gap-2 mb-6">
        <TouchableOpacity
          onPress={() => setActiveTab("your")}
          className={`flex-1 py-3 rounded-full border ${
            activeTab === "your"
              ? "bg-[#E9E4DC] border-transparent"
              : "border-[#E9E4DC]"
          }`}
        >
          <Text
            className={`text-center font-medium ${
              activeTab === "your" ? "text-black" : "text-gray-500"
            }`}
          >
            Your Decks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("discover")}
          className={`flex-1 py-3 rounded-full border ${
            activeTab === "discover"
              ? "bg-primary border-transparent"
              : "border-primary"
          }`}
        >
          <Text
            className={`text-center font-medium ${
              activeTab === "discover" ? "text-black" : "text-gray-500"
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
