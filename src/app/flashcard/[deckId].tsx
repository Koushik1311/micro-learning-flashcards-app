import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function FlashcardScreen() {
  const { deckId } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center bg-[#F4F1EB]">
      <Text className="text-xl font-semibold text-[#3D3C38]">Deck Details</Text>
      <Text className="text-base text-[#55524C] mt-2">Deck ID: {deckId}</Text>
    </View>
  );
}
