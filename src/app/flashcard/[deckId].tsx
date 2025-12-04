import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "../../components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDeckWithProgressById } from "@/query/decks";
import { ProgressBar } from "../../components/ui/ProgressBar";
import FlashcardUI from "@/components/flashcard/FlashcardUI";
import { useSessionQueue } from "@/hooks/cards";

export default function FlashcardScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { data: deckData, isLoading } = useDeckWithProgressById(deckId);
  const {
    card,
    cardsLeftToday,
    isLoading: isQueueLoading,
    isError,
    error,
    submitRating,
  } = useSessionQueue(deckId, 20); // default 20, later user-configurable

  if (isLoading || !deckId || !deckData) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isQueueLoading) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Loading cards...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Error loading session: {error?.message}</Text>
      </SafeAreaView>
    );
  }

  if (!card) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>No cards to review! 🎉</Text>
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
          <View className="flex-1 mr-4">
            <ProgressBar percent={deckData.progress.percent} />
          </View>
          <Text className="text-xs text-stone-600">
            {cardsLeftToday} left
          </Text>
        </View>
        <FlashcardUI
          deckName={deckData.title}
          learned={deckData.progress.learned}
          total={deckData.progress.total || deckData.card_count}
          question={card.question}
          answer={card.answer}
          hint={card.hint}
          onSubmitRating={submitRating}
        />
      </Container>
    </SafeAreaView>
  );
}
