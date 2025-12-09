import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { QuizResult } from "@/types/quiz";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type QuizResultsProps = {
  results: QuizResult;
  onRetake: () => void;
};

const optionLabels = ["A", "B", "C", "D"];

export default function QuizResults({ results, onRetake }: QuizResultsProps) {
  const { score, totalQuestions, percentage, questions, answers } = results;
  console.log("===========results===========");
  console.log(score, totalQuestions);

  const getScoreColor = () => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreEmoji = () => {
    if (percentage >= 75) return "🎉";
    if (percentage >= 50) return "👍";
    return "💪";
  };

  return (
    <ScrollView className="flex-1 p-4">
      {/* Score Header */}
      <View className="items-center mb-8 mt-4">
        <Text className="text-6xl mb-2">{getScoreEmoji()}</Text>
        <Text className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>
          {score}/{totalQuestions}
        </Text>
        <Text className={`text-2xl font-semibold ${getScoreColor()}`}>
          {Math.round(percentage)}%
        </Text>
      </View>

      {/* Results Breakdown */}
      <View className="gap-4 mb-6">
        {questions.map((question, index) => {
          const answer = answers[index];
          const isCorrect = answer.isCorrect;
          const selectedLabel = optionLabels[answer.selectedIndex];
          const correctLabel = optionLabels[question.correctIndex];

          return (
            <View
              key={question.cardId}
              className={`
                border-2 rounded-2xl p-4 bg-white
                ${isCorrect ? "border-green-500" : "border-red-500"}
              `}
            >
              {/* Question */}
              <View className="mb-3">
                <Text className="text-sm font-semibold text-stone-500 mb-1">
                  Question {index + 1}
                </Text>
                <Text className="text-base font-semibold text-stone-800">
                  {question.question}
                </Text>
              </View>

              {/* Your Answer */}
              <View className="mb-2">
                <Text className="text-sm font-semibold text-stone-600 mb-1">
                  Your Answer:
                </Text>
                <View className="flex-row items-center gap-2">
                  <View
                    className={`
                      w-6 h-6 rounded-full items-center justify-center
                      ${isCorrect ? "bg-green-500" : "bg-red-500"}
                    `}
                  >
                    <Text className="text-white text-xs font-bold">
                      {selectedLabel}
                    </Text>
                  </View>
                  <Text
                    className={`
                      flex-1 text-base
                      ${isCorrect ? "text-green-700" : "text-red-700"}
                    `}
                  >
                    {answer.selectedOption}
                  </Text>
                  {isCorrect ? (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={24}
                      color="#22c55e"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={24}
                      color="#ef4444"
                    />
                  )}
                </View>
              </View>

              {/* Correct Answer (if wrong) */}
              {!isCorrect && (
                <View className="mb-2">
                  <Text className="text-sm font-semibold text-stone-600 mb-1">
                    Correct Answer:
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <View className="w-6 h-6 rounded-full items-center justify-center bg-green-500">
                      <Text className="text-white text-xs font-bold">
                        {correctLabel}
                      </Text>
                    </View>
                    <Text className="flex-1 text-base text-green-700">
                      {question.correctAnswer}
                    </Text>
                  </View>
                </View>
              )}

              {/* Solution (if available) */}
              {question.solution && (
                <View className="mt-2 pt-2 border-t border-stone-200">
                  <Text className="text-sm font-semibold text-stone-600 mb-1">
                    Explanation:
                  </Text>
                  <Text className="text-sm text-stone-700">
                    {question.solution}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Retake Button */}
      <TouchableOpacity
        onPress={onRetake}
        className="bg-stone-800 rounded-2xl p-4 items-center mb-8"
      >
        <Text className="text-white font-semibold text-lg">Retake Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
