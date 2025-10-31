import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const STORAGE_KEY = "study_streak_data_v1";

export default function StudyStreak() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Monday = 0

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);

          // Check if it's a new week
          const lastReset = new Date(data.lastReset);
          const now = new Date();

          const diffInDays =
            (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24);

          // Reset every Monday or if more than 7 days passed
          const isNewWeek =
            (now.getDay() === 1 && diffInDays > 0) || diffInDays > 7;

          if (isNewWeek) {
            await AsyncStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                completedDays: [todayIndex],
                lastReset: now.toISOString(),
              }),
            );
            setCompletedDays([todayIndex]);
          } else {
            setCompletedDays(data.completedDays || []);
          }
        } else {
          // First-time init
          const now = new Date();
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              completedDays: [todayIndex],
              lastReset: now.toISOString(),
            }),
          );
          setCompletedDays([todayIndex]);
        }
      } catch (e) {
        console.error("Error loading streak data:", e);
      }
    };

    loadData();
  }, []);

  // Save today's completion automatically
  useEffect(() => {
    const saveToday = async () => {
      if (!completedDays.includes(todayIndex)) {
        const newDays = [...completedDays, todayIndex];
        setCompletedDays(newDays);
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const data = saved ? JSON.parse(saved) : {};
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...data,
            completedDays: newDays,
          }),
        );
      }
    };
    saveToday();
  }, []);

  return (
    <View>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-semibold text-gray-800">
          Study Streak
        </Text>
        <MaterialIcons name="calendar-month" size={20} color="#6B6B6B" />
      </View>

      <View className="flex-row justify-between">
        {days.map((day, index) => {
          const isChecked = completedDays.includes(index);

          return (
            <View key={index}>
              <Text className="mt-2 mb-1.5 text-center text-gray-700 font-medium text-sm">
                {day}
              </Text>
              <View
                className={`w-8 h-8 rounded-full border-2 items-center justify-center ${
                  isChecked ? "bg-gray-200 border-gray-200" : "border-gray-300"
                }`}
              >
                {isChecked && (
                  <MaterialIcons name="check" size={16} color="#4B5563" />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
