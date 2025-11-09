import { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import { MotiView } from "moti";
import Svg, { Circle } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 250;

type FlashcardContainerProps = {
  question: string;
  answer: string;
  hint?: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function FlashcardContainer({
  question,
  answer,
  hint,
}: FlashcardContainerProps) {
  const [revealed, setRevealed] = useState(false);
  const radius = useSharedValue(0);

  const animatedCircleProps = useAnimatedProps(() => ({
    r: radius.value,
  }));

  const handleReveal = () => {
    if (revealed) {
      // hide
      radius.value = withTiming(0, { duration: 600 });
      setTimeout(() => setRevealed(false), 500);
    } else {
      // show
      setRevealed(true);
      radius.value = withTiming(width * 1.2, { duration: 600 });
    }
  };

  return (
    <View className="items-center justify-center p-4">
      <View className="relative w-full min-h-[250px] rounded-2xl overflow-hidden shadow-md">
        {/* FRONT: Question */}
        {!revealed && (
          <View className="absolute inset-0 bg-white rounded-2xl p-6 justify-center items-center">
            <Text className="text-xl font-semibold text-center text-stone-800">
              {question}
            </Text>
          </View>
        )}

        {/* BACK: Revealed hint & answer */}
        {revealed && (
          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <Svg width={width} height={CARD_HEIGHT}>
                <AnimatedCircle
                  animatedProps={animatedCircleProps}
                  cx={width - 50} // from bottom right corner
                  cy={CARD_HEIGHT - 30}
                  fill="black"
                />
              </Svg>
            }
          >
            <View className="absolute inset-0 bg-stone-800 rounded-2xl p-6 justify-center items-center">
              <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 500, delay: 200 }}
              >
                {hint && (
                  <Text className="text-base text-amber-400 mb-2 italic">
                    Hint: {hint}
                  </Text>
                )}
                <Text className="text-2xl font-bold text-center text-white">
                  {answer}
                </Text>
              </MotiView>
            </View>
          </MaskedView>
        )}

        {/* Reveal button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleReveal}
          className="absolute bottom-4 right-4 bg-stone-700 p-3 rounded-full"
        >
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
