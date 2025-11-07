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
      ListHeaderComponent={<ListHeader />}
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
    >
      <View className="flex-row justify-between items-center mx-4">
        <View className="flex-1">
          <Text className="text-lg font-medium text-stone-800">
            {item.title}
          </Text>
          <Text className="text-sm text-[#373739]">
            {item.progress.learned} / {item.progress.total} cards
          </Text>
        </View>

        <Text className="text-stone-800">{pct.toFixed(1)}%</Text>
      </View>

      <View className="border-b border-stone-300 w-screen my-5" />
    </MotiView>
  );
}

function ListHeader() {
  return (
    <View className="flex-row justify-between px-4 mb-5 mt-2">
      <Text className="text-[12px] font-semibold text-stone-500 tracking-wider">
        DECK TITLE
      </Text>
      <Text className="text-[12px] font-semibold text-stone-500 tracking-wider">
        COMPLETE
      </Text>
    </View>
  );
}
