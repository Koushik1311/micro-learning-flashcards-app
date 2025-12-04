import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "../../components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDeckWithProgressById } from "@/query/decks";
import { ProgressBar } from "../../components/ui/ProgressBar";
import FlashcardUI from "@/components/flashcard/FlashcardUI";
import { useNextCard } from "@/hooks/cards";

export default function FlashcardScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { data: deckData, isLoading } = useDeckWithProgressById(deckId);
  const { card, isLoading: isCardLoading, isError, error, submitRating, reload } = useNextCard(deckId);

  if (isLoading || !deckData) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isCardLoading) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Loading card...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Error loading card: {error?.message}</Text>
      </SafeAreaView>
    );
  }

  if (!card) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>No more cards to review! 🎉</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-bg flex-1">
      <Container className="mt-16">
        <View className="flex-row items-center justify-between gap-4 mr-16 ml-1 mb-28">
          <MaterialCommunityIcons
            name="close-thick"
            size={30}
            color="#292524"
          />
          <ProgressBar percent={deckData.progress.percent} />
        </View>
        <FlashcardUI 
          deckName={deckData.title} 
          question={card.question}
          answer={card.answer} 
          hint={card.hint} 
          onSubmitRating={submitRating}
        />
      </Container>
    </SafeAreaView>
  );
}
