import { View } from "react-native";
import { MotiView } from "moti";

type Props = {
  percent: number; // 0–100
  height?: number; // optional bar height
};

export function ProgressBar({ percent, height = 6 }: Props) {
  return (
    <View
      className="w-full bg-gray-200 rounded-full overflow-hidden"
      style={{ height }}
    >
      <MotiView
        from={{ width: "0%" }}
        animate={{ width: `${percent}%` }}
        transition={{
          type: "timing",
          duration: 800,
        }}
        className="h-full bg-green-500 rounded-full"
      />
    </View>
  );
}
