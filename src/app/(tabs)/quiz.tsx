import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useDecksWithProgress } from "@/query/decks";
import Header from "@/components/layout/Header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";

export default function QuizScreen() {
  const { data: decks, isLoading } = useDecksWithProgress();

  if (isLoading) {
    return (
      <SafeAreaView className="bg-bg flex-1 items-center justify-center">
        <Text className="text-stone-600">Loading decks...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Header className="mb-4 mt-1">
        <Text className="text-xl font-bold text-stone-800">
          Select Deck for Quiz
        </Text>
      </Header>
      <FlatList
        data={decks}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/quiz/${item.id}`)}
            className="flex-row items-center justify-between p-4 mb-3 bg-white rounded-xl border border-stone-200"
          >
            <View className="flex-1">
              <Text className="text-lg font-semibold text-stone-800">
                {item.title}
              </Text>
              <Text className="text-sm text-stone-500 mt-1">
                {item.progress.learned} / {item.progress.total} cards
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#78716c"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MaterialIcons name="quiz" size={64} color="#78716c" />
            <Text className="text-lg font-semibold text-stone-800 mt-4">
              No decks available
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
