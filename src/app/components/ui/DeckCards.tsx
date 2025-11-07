import { useDecksWithProgress } from "@/query/decks";
import { View, Text, FlatList } from "react-native";
import { MotiView } from "moti";

export default function DeckCards() {
  const { data: decks, isLoading } = useDecksWithProgress();
  console.log("Decks with progress: ", decks);

  if (isLoading) return <Text className="text-center mt-6">Loading...</Text>;
  if (!decks || decks.length === 0)
    return <Text className="text-center mt-6">No decks found</Text>;

  return (
    <FlatList
      data={decks}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => <DeckRow item={item} index={index} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

function DeckRow({ item, index }) {
  const pct = item.progress.percent ?? 0;
  console.log("Rendering deck row:", item.title);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 60, duration: 250 }}
      className="rounded-xl p-4 mb-3"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-base font-semibold">{item.title}</Text>
          <Text className="text-xs text-gray-400 mt-1">
            {item.progress.learned} / {item.progress.total} cards
          </Text>
        </View>

        <Text className="text-sm font-medium">{pct.toFixed(1)}%</Text>
      </View>
    </MotiView>
  );
}
