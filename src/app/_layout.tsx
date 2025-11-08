import "react-native-reanimated";
import { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import { initDB } from "@/lib/db";
import { seedDummyData } from "@/lib/seed";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query/client";

export default function Layout() {
  useEffect(() => {
    (async () => {
      await initDB(); // ensure tables exist
      await seedDummyData(); // only then seed data
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
