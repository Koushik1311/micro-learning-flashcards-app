import Container from "../../components/ui/Container";
import StudyStreak from "../../components/ui/StudyStreak";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveDecks from "../../components/ui/ActiveDecks";
import Header from "../../components/layout/Header";
import { Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Header>
        <Text>Logo</Text>
      </Header>
      <Container className="pt-3">
        <StudyStreak />
      </Container>

      <Container className="pt-12 px-[-16px]">
        <ActiveDecks />
      </Container>
    </SafeAreaView>
  );
}
