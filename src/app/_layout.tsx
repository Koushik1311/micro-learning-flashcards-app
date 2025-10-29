import { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import { initDB } from "@/lib/db";
import { seedDummyData } from "@/lib/seed";

export default function Layout() {
  useEffect(() => {
    initDB();
    seedDummyData();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
