import { useDecks } from "@/query/decks";
import { Link } from "expo-router";
import { View, Text, FlatList } from "react-native";

export default function ActiveDecks() {
  const { data: decks, isLoading } = useDecks();

  return (
    <View>
      <View className="mb-3 px-4">
        <Text className="text-xl font-bold">Active Decks</Text>
      </View>

      <FlatList
        data={decks}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <View className="overflow-visible">
            <View
              className="flex-1 border border-stone-300 rounded-md mb-1.5 bg-surface"
              style={{ elevation: 6 }}
            >
              <Link href={`/decks/${item.id}`}>
                <View className="px-5 py-3.5">
                  <Text className="font-semibold">{item.title}</Text>
                  <Text className="text-sm text-stone-400 font-medium">
                    {item.card_count} cards in this deck
                  </Text>
                </View>
              </Link>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
