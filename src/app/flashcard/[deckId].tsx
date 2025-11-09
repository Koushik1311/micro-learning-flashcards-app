import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "../components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDeckWithProgressById } from "@/query/decks";
import { DeckProgressBar } from "../components/ui/DeckProgressBar";

export default function FlashcardScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { data: deckData } = useDeckWithProgressById(deckId);
  console.log("Deck Progress: ", deckData);

  return (
    <SafeAreaView className="bg-bg">
      <Container>
        <View className="flex-row items-center justify-between">
          <MaterialCommunityIcons name="chevron-left" size={30} color="black" />
          <Text className="text-lg font-semibold">{deckData.title}</Text>
          <Text className="text-lg font-semibold">
            {deckData.progress.learned} /{" "}
            {deckData.card_count || deckData.progress.total}
          </Text>
        </View>
        <DeckProgressBar percent={deckData.progress.percent} />
      </Container>
    </SafeAreaView>
  );
}
