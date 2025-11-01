import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const STORAGE_KEY = "study_streak_data_v1";

export default function StudyStreak() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Monday = 0

  // -------------------------
  // Load saved streak data
  // -------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const now = new Date();

        if (saved) {
          const data = JSON.parse(saved);
          const lastReset = new Date(data.lastReset);

          const diffInDays =
            (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24);

          // Reset every Monday or if more than 7 days passed
          const isNewWeek =
            (now.getDay() === 1 && diffInDays > 0) || diffInDays > 7;

          if (isNewWeek) {
            const newData = {
              completedDays: [todayIndex],
              lastReset: now.toISOString(),
            };
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
            setCompletedDays([todayIndex]);
          } else {
            setCompletedDays(data.completedDays || []);
          }
        } else {
          // First time init
          const newData = {
            completedDays: [todayIndex],
            lastReset: now.toISOString(),
          };
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          setCompletedDays([todayIndex]);
        }

        setIsInitialized(true);
      } catch (e) {
        console.error("Error loading streak data:", e);
      }
    };

    loadData();
  }, []);

  // -------------------------
  // Mark today as completed (once data is loaded)
  // -------------------------
  useEffect(() => {
    if (!isInitialized) return;

    const saveToday = async () => {
      try {
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
      } catch (e) {
        console.error("Error saving streak data:", e);
      }
    };

    saveToday();
  }, [isInitialized, completedDays, todayIndex]);

  // -------------------------
  // UI
  // -------------------------
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
            <View key={index} className="items-center">
              <Text
                className={`mt-2 mb-1.5 text-center font-medium text-sm ${
                  isChecked ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {day}
              </Text>
              <View
                className={`w-8 h-8 rounded-full border-2 items-center justify-center ${
                  isChecked ? "bg-gray-200 border-gray-200" : "border-gray-400"
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
