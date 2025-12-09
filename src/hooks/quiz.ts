import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCardsForQuiz } from "@/db/quiz.queries";
import { generateQuiz } from "@/lib/quiz";
import {
  QuizQuestion,
  QuizAnswer,
  QuizResult,
  QuizSettings,
} from "@/types/quiz";

// Default settings (will be replaced by user settings later)
const DEFAULT_QUIZ_SETTINGS: QuizSettings = {
  questionCount: 4,
};

export function useQuiz(deckId: string, settings?: Partial<QuizSettings>) {
  const finalSettings = { ...DEFAULT_QUIZ_SETTINGS, ...settings };
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, number>>(
    new Map()
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);

  // Fetch cards for the specific deck
  const { data: cards, isLoading } = useQuery({
    queryKey: ["quiz-cards", deckId],
    queryFn: () => getCardsForQuiz(deckId, 100), // Fetch more than needed for randomization
    enabled: !!deckId,
  });

  // Generate quiz when cards are loaded
  useEffect(() => {
    if (cards && cards.length > 0) {
      const quiz = generateQuiz(cards, finalSettings.questionCount);
      setQuestions(quiz);
      setCurrentIndex(0);
      setSelectedAnswers(new Map());
      setIsSubmitted(false);
      setResults(null);
    } else if (cards && cards.length === 0) {
      // No cards available
      setQuestions([]);
    }
  }, [cards, finalSettings.questionCount]);

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => new Map(prev).set(questionIndex, optionIndex));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const submitQuiz = () => {
    const answers: QuizAnswer[] = questions.map((q, index) => {
      const selectedIndex = selectedAnswers.get(index) ?? -1;
      const selectedOption = selectedIndex >= 0 ? q.options[selectedIndex] : "";
      const isCorrect = selectedIndex === q.correctIndex;

      return {
        questionIndex: index,
        selectedOption,
        selectedIndex,
        isCorrect,
      };
    });

    const score = answers.filter((a) => a.isCorrect).length;
    const percentage = (score / questions.length) * 100;

    setResults({
      questions,
      answers,
      score,
      totalQuestions: questions.length,
      percentage,
    });
    setIsSubmitted(true);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers(new Map());
    setIsSubmitted(false);
    setResults(null);
    // Regenerate quiz with new random selection
    if (cards) {
      const quiz = generateQuiz(cards, finalSettings.questionCount);
      setQuestions(quiz);
    }
  };

  return {
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex],
    selectedAnswers,
    isSubmitted,
    results,
    isLoading,
    selectAnswer,
    nextQuestion,
    submitQuiz,
    resetQuiz,
    canProceed: selectedAnswers.has(currentIndex),
    isLastQuestion: currentIndex === questions.length - 1,
  };
}
