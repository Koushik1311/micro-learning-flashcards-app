import { getAllDecks } from "@/lib/db";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import StudyStreak from "../components/ui/StudyStreak";
import { View } from "react-native";

export default function HomeScreen() {
  const [deckCount, setDeckCount] = useState(0);
  const router = useRouter();
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleDay = (index: number) => {
    setCompleted((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  useEffect(() => {
    (async () => {
      const decks = await getAllDecks();
      setDeckCount(decks.length);
    })();
  }, []);

  return (
    <Container>
      <View className="pt-8">
        <StudyStreak />
      </View>
    </Container>
  );
}
