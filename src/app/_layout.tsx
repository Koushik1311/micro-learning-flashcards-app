import { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import { getAllDecks, initDB } from "@/lib/db";
import { seedDummyData } from "@/lib/seed";

export default function Layout() {
  useEffect(() => {
    (async () => {
      await initDB(); // ensure tables exist
      await seedDummyData(); // only then seed data
      const decks = await getAllDecks();
      console.log("✅ Decks loaded:", decks);
    })();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
