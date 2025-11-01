import Container from "../components/ui/Container";
import StudyStreak from "../components/ui/StudyStreak";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveDecks from "../components/ui/ActiveDecks";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Container className="pt-3">
        <StudyStreak />
      </Container>

      <Container className="pt-12">
        <ActiveDecks />
      </Container>
    </SafeAreaView>
  );
}
