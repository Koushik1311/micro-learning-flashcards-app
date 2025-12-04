import { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Rating } from "@/types/card";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 400;

type FlashcardUIProps = {
  deckName: string;
  question: string;
  answer: string;
  hint?: string;
  onSubmitRating?: (rating: Rating) => void;
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function
  FlashcardUI({
  deckName,
  question,
  answer,
  hint,
  onSubmitRating,
}: FlashcardUIProps) {
  const [revealed, setRevealed] = useState(false);
  const radius = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const originX = width - 90;
  const originY = CARD_HEIGHT - 40;

  // 🧠 Animate square expansion + corner morph
  const animatedRectProps = useAnimatedProps(() => {
    // radius.value grows from 0 → width * 1.35
    const maxRadius = width * 1.35;

    // interpolate rx (corner radius)
    const rx = 60 * (1 - radius.value / maxRadius); // large when small, small when large

    return {
      x: originX - radius.value,
      y: originY - radius.value,
      width: radius.value * 2,
      height: radius.value * 2,
      rx, // smooth corner rounding
    };
  });

  const handleReveal = () => {
    if (revealed) {
      cardScale.value = withTiming(0.98, { duration: 150 }, () => {
        cardScale.value = withTiming(1, { duration: 150 });
      });
      // 👇 no scale pulse when retracting
      radius.value = withTiming(0, { duration: 300 });
      setTimeout(() => setRevealed(false), 250);
    } else {
      // 👇 scale pulse only when expanding
      cardScale.value = withTiming(1.03, { duration: 180 }, () => {
        cardScale.value = withTiming(1, { duration: 180 });
      });

      setRevealed(true);
      radius.value = withTiming(width * 1.35, { duration: 400 });
    }
  };
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

   const handleRating = (rating: Rating) => {
    onSubmitRating?.(rating);
    // Reset card state for next card
    setRevealed(false);
    radius.value = 0;
  };

  return (
    <View className="items-center justify-center p-4 w-full">
      <Animated.View
        style={cardAnimatedStyle}
        className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-md bg-white"
      >
        {/* Base Question Card */}
        <View className="absolute inset-0 rounded-2xl p-6">
          <View className="flex-row justify-center">
            <Text className="font-semibold text-stone-500">{deckName}</Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl font-semibold text-center text-stone-800">
              {question}
            </Text>
          </View>
          
        </View>

        {/* Hint + Answer Overlay */}
        {revealed && (
          <MaskedView
            style={{ flex: 1, position: "absolute", inset: 0 }}
            maskElement={
              <Svg width={width} height={CARD_HEIGHT}>
                <AnimatedRect
                  animatedProps={animatedRectProps}
                  // cx={originX}
                  // cy={originY}
                  fill="black"
                />
              </Svg>
            }
          >
            <View className="absolute inset-0 bg-stone-800 rounded-2xl justify-center items-center">
              <View>
                {hint && (
                  <Text className="text-base text-amber-400 mb-2 italic">
                    Hint: {hint}
                  </Text>
                )}
                <Text className="text-2xl font-bold text-center text-white">
                  {answer}
                </Text>
              </View>
            </View>
          </MaskedView>
        )}

        {/* Reveal Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleReveal}
          className="absolute bottom-4 right-4 bg-stone-800 p-3 rounded-full"
        >
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Rating Buttons - Show when answer is revealed */}
      {revealed && onSubmitRating && (
        <View className="flex-row gap-4 mt-6">
          <TouchableOpacity
            onPress={() => handleRating("again")}
            className="bg-red-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRating("hard")}
            className="bg-orange-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Hard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRating("easy")}
            className="bg-green-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Easy</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
