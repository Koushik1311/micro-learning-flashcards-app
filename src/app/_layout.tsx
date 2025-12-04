import "react-native-reanimated";
import { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import { db, initDB } from "@/lib/db";
import { seedDummyData } from "@/lib/seed";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query/client";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  useEffect(() => {
    (async () => {
      await initDB(); // ensure tables exist
      await seedDummyData(); // only then seed data


      try {
        const cardReviews = await db.getAllAsync("SELECT * FROM card_reviews;");
        const existingCards = await db.getAllAsync<{ count: number }>('SELECT COUNT(*) as count FROM cards;');
        const results = await db.getAllAsync("SELECT * FROM deck_progress;");
        // console.log("=== cards data ===");
        // console.log(JSON.stringify(existingCards, null, 2));
        console.log("=== results data ===");
        console.log(JSON.stringify(results, null, 2));
        // console.log("=== card_reviews data ===");
        // console.log(JSON.stringify(cardReviews, null, 2));
        // console.log(`Total reviews: ${cardReviews.length}`);
      } catch (error) {
        console.error("Error fetching card_reviews:", error);
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
        >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
        </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
