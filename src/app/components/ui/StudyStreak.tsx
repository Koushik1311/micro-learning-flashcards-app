import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

const days = ["M", "T", "W", "T", "F", "S", "S"];

type Props = {
  completedDays?: number[];
  onToggleDay?: (index: number) => void;
};

export default function StudyStreak({ completedDays, onToggleDay }: Props) {
  return (
    <View className="bg-[#F4F1EB] rounded-2xl">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-gray-800">
          Study Streak
        </Text>
        <MaterialIcons name="calendar-month" size={20} color="#6B6B6B" />
      </View>

      <View className="flex-row justify-between">
        {days.map((day, index) => {
          const isChecked = completedDays?.includes(index);

          return (
            <View key={index}>
              <Text className="mt-1 mb-1.5 text-center text-gray-700 font-medium">
                {day}
              </Text>
              <TouchableOpacity
                className="items-center"
                onPress={() => onToggleDay?.(index)}
              >
                <View
                  className={cn(
                    "w-8 h-8 rounded-full border-2 items-center justify-center",
                    isChecked
                      ? "bg-gray-200 border-gray-200"
                      : "border-gray-300",
                  )}
                >
                  {isChecked && (
                    <MaterialIcons name="check" size={16} color="#4B5563" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}
