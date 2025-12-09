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
        const quiz = await db.getAllAsync(
          "SELECT * FROM cards WHERE deck_id = ? AND options IS NOT NULL AND options != '';"
        );

        console.log("=======Quiz=======");
        console.log(JSON.stringify(quiz, null, 2));

        // const cards = await db.getAllAsync("SELECT * FROM cards LIMIT 10;");

        // console.log("=======Cards=======");
        // console.log(JSON.stringify(cards, null, 2));
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
