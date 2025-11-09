import { View, Text } from "react-native";
import { MotiView } from "moti";

type Props = {
  percent: number; // 0–100
};

export function DeckProgressBar({ percent }: Props) {
  return (
    <View className="w-full mt-3">
      {/* Header row */}
      <View className="flex-row justify-between mb-1">
        <Text className="text-sm text-gray-600">Progress</Text>
        <Text className="text-sm font-medium text-gray-800">
          {percent.toFixed(0)}%
        </Text>
      </View>

      {/* Background bar */}
      <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <MotiView
          from={{ width: "0%" }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "timing", duration: 800 }}
          className="h-full bg-green-500 rounded-full"
        />
      </View>
    </View>
  );
}
