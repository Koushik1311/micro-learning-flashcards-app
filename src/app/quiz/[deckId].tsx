import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Container from "../../components/ui/Container";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDeckWithProgressById } from "@/query/decks";
import { useQuiz } from "@/hooks/quiz";
import QuizQuestionCard from "@/components/quiz/QuizQuestionCard";
import QuizResults from "@/components/quiz/QuizResults";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function QuizDeckScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { data: deckData, isLoading } = useDeckWithProgressById(deckId);
  const {
    questions,
    currentIndex,
    currentQuestion,
    selectedAnswers,
    isSubmitted,
    results,
    isLoading: isQuizLoading,
    selectAnswer,
    nextQuestion,
    submitQuiz,
    resetQuiz,
    canProceed,
    isLastQuestion,
  } = useQuiz(deckId);

  if (isLoading || !deckId || !deckData) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isQuizLoading) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text className="text-stone-600">Loading quiz...</Text>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView className="bg-bg flex-1">
        <Container className="mt-16">
          <View className="flex-row items-center justify-between gap-4 mr-16 ml-1 mb-8">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-7 h-7 justify-center items-center">
                <View className="w-6 h-[3px] bg-black rotate-45 absolute rounded-full" />
                <View className="w-6 h-[3px] bg-black -rotate-45 absolute rounded-full" />
              </View>
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-stone-500 text-center">
                Quiz
              </Text>
            </View>
          </View>
          <View className="items-center justify-center p-4">
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={64}
              color="#78716c"
            />
            <Text className="text-xl font-semibold text-stone-800 mt-4 text-center">
              No quiz cards available
            </Text>
            <Text className="text-stone-600 mt-2 text-center">
              This deck doesn't have any cards with quiz options configured
            </Text>
          </View>
        </Container>
      </SafeAreaView>
    );
  }

  if (isSubmitted && results) {
    return (
      <SafeAreaView className="bg-bg flex-1">
        <Container className="mt-4 flex-1">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-7 h-7 justify-center items-center">
                <View className="w-6 h-[3px] bg-black rotate-45 absolute rounded-full" />
                <View className="w-6 h-[3px] bg-black -rotate-45 absolute rounded-full" />
              </View>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-stone-800">
              Quiz Results
            </Text>
            <View className="w-7" />
          </View>
          <View className="flex-1">
            <QuizResults results={results} onRetake={resetQuiz} />
          </View>
        </Container>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text className="text-stone-600">No question available</Text>
      </SafeAreaView>
    );
  }

  const selectedIndex = selectedAnswers.get(currentIndex) ?? null;

  return (
    <SafeAreaView className="bg-bg flex-1">
      <Container className="mt-16">
        {/* Header */}
        <View className="flex-row items-center justify-between gap-4 mr-4 ml-1 mb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <View className="w-7 h-7 justify-center items-center">
              <View className="w-6 h-[3px] bg-black rotate-45 absolute rounded-full" />
              <View className="w-6 h-[3px] bg-black -rotate-45 absolute rounded-full" />
            </View>
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-stone-500 text-center">
              {deckData.title}
            </Text>
          </View>
          {isLastQuestion ? (
            <TouchableOpacity
              onPress={submitQuiz}
              disabled={!canProceed}
              className={`
                rounded-xl px-4 py-2
                ${canProceed ? "bg-stone-800" : "bg-stone-300"}
              `}
            >
              <Text
                className={`
                  font-semibold text-sm
                  ${canProceed ? "text-white" : "text-stone-500"}
                `}
              >
                Submit
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={nextQuestion}
              disabled={!canProceed}
              className={`
                rounded-xl px-4 py-2
                ${canProceed ? "bg-stone-800" : "bg-stone-300"}
              `}
            >
              <Text
                className={`
                  font-semibold text-sm
                  ${canProceed ? "text-white" : "text-stone-500"}
                `}
              >
                Next
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Question Card */}
        <QuizQuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedIndex={selectedIndex}
          onSelectOption={(index) => selectAnswer(currentIndex, index)}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
        />
      </Container>
    </SafeAreaView>
  );
}
