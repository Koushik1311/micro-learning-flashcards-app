import { View, Text } from 'react-native'
import React from 'react'
import FlashcardContainer from './FlashcardContainer';

type FlashcardUIProps = {
  deckName: string;
  learned: number;
  total: number;
  question: string;
  answer: string;
  hint?: string;
};

export default function Flashcard({ deckName, learned, total, question, answer, hint }: FlashcardUIProps) {
  return (
    <FlashcardContainer
          deckName={deckName}
          learned={learned}
          total={total}
          question={question}
          answer={answer}
          hint={hint}
        />
  )
}