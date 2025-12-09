import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 400;

type QuizQuestionCardProps = {
  question: string;
  options: string[];
  selectedIndex: number | null;
  onSelectOption: (index: number) => void;
  questionNumber: number;
  totalQuestions: number;
};

const optionLabels = ["A", "B", "C", "D"];

export default function QuizQuestionCard({
  question,
  options,
  selectedIndex,
  onSelectOption,
  questionNumber,
  totalQuestions,
}: QuizQuestionCardProps) {
  const cardScale = useSharedValue(1);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const handleSelect = (index: number) => {
    cardScale.value = withTiming(0.98, { duration: 100 }, () => {
      cardScale.value = withTiming(1, { duration: 100 });
    });
    onSelectOption(index);
  };

  return (
    <View className="items-center justify-center p-4 w-full">
      <Animated.View
        style={cardAnimatedStyle}
        className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-md bg-white"
      >
        {/* Question Card */}
        <View className="absolute inset-0 rounded-2xl p-6">
          <View className="flex-row justify-center mb-4">
            <Text className="font-semibold text-stone-500">
              Question {questionNumber} of {totalQuestions}
            </Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl font-semibold text-center text-stone-800">
              {question}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* MCQ Options */}
      <View className="w-full mt-6 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(index)}
              activeOpacity={0.8}
              className={`
                border-2 rounded-2xl p-4 bg-white
                ${
                  isSelected
                    ? "border-stone-800 bg-stone-50"
                    : "border-stone-300"
                }
              `}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className={`
                    w-8 h-8 rounded-full items-center justify-center
                    ${isSelected ? "bg-stone-800" : "bg-stone-200"}
                  `}
                >
                  <Text
                    className={`
                      font-bold text-sm
                      ${isSelected ? "text-white" : "text-stone-600"}
                    `}
                  >
                    {optionLabels[index]}
                  </Text>
                </View>
                <Text
                  className={`
                    flex-1 text-base
                    ${
                      isSelected
                        ? "font-semibold text-stone-800"
                        : "text-stone-700"
                    }
                  `}
                >
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
