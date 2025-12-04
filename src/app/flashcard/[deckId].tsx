import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "../../components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDeckWithProgressById } from "@/query/decks";
import { ProgressBar } from "../../components/ui/ProgressBar";
import FlashcardContainer from "../../components/flashcard/FlashcardContainer";
import Flashcard from "@/components/flashcard/Flashcard";

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

  // TODO: replace this with real cards from deckData
  const cards = [
    {
      question: "Capital of India?",
      answer: "New Delhi",
      hint: "Starts with N",
    },
    {
      question: "Capital of France?",
      answer: "Paris",
      hint: "City of Light",
    },
    {
      question: "Capital of Japan?",
      answer: "Tokyo",
      hint: "Starts with T",
    },
  ];

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
        <Flashcard deckName={deckData.title} learned={deckData.progress.learned} total={deckData.progress.total || deckData.card_count} question="What is the capital of France?" answer="Paris" hint="City of Light" />
      </Container>
    </SafeAreaView>
  );
}
