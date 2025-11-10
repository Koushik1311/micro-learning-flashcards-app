import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "../components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDeckWithProgressById } from "@/query/decks";
import { ProgressBar } from "../components/ui/ProgressBar";
import FlashcardContainer from "../components/flashcard/FlashcardContainer";

export default function FlashcardScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { data: deckData, isLoading } = useDeckWithProgressById(deckId);

  if (isLoading || !deckData) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-bg flex-1">
      <View className="mr-4 ml-2 mb-2">
        <View className="flex-row items-center justify-between">
          <MaterialCommunityIcons name="chevron-left" size={30} color="black" />
          <Text className="text-lg font-semibold">{deckData.title}</Text>
          <Text className="text-lg font-semibold">
            {deckData.progress.learned} /{" "}
            {deckData.card_count || deckData.progress.total}
          </Text>
        </View>
      </View>
      <Container>
        <ProgressBar percent={deckData.progress.percent} />
      </Container>
      <Container className="flex-1 justify-center">
        <FlashcardContainer
          question="Capital of India?"
          answer="New Delhi"
          hint="Starts with N"
        />
      </Container>
    </SafeAreaView>
  );
}
