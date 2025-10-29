import { db } from './db';
import uuid from 'react-native-uuid';

const dummyDecks = [
  {
    id: uuid.v4() as string,
    slug: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript, the programming language of the web.',
    card_count: 3,
    is_premium: 0,
    cover_image_url: 'https://placehold.co/600x400/js.png',
    price_rupees: 0.0,
    imported_at: Date.now(),
  },
  {
    id: uuid.v4() as string,
    slug: 'indian-history',
    title: 'Indian History',
    description: 'Explore the rich and diverse history of India from ancient to modern times.',
    card_count: 3,
    is_premium: 1,
    cover_image_url: 'https://placehold.co/600x400/history.png',
    price_rupees: 49.0,
    imported_at: Date.now(),
  },
];

const dummyCards = [
  {
    deckSlug: 'javascript-basics',
    question: 'What is a closure in JavaScript?',
    answer:
      'A closure is a function that retains access to its lexical scope even when executed outside that scope.',
    hint: 'Think about functions inside functions.',
    solution:
      'A closure allows a function to access variables from an enclosing scope even after that scope has finished executing.',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What keyword declares a constant variable in JavaScript?',
    answer: '`const` keyword',
    hint: 'It starts with "c".',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is the difference between == and === in JavaScript?',
    answer:
      '`==` checks for value equality with type coercion, while `===` checks for both value and type equality.',
    hint: 'One is strict, the other is not.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was the first Prime Minister of India?',
    answer: 'Jawaharlal Nehru',
    hint: 'He is known as the "Architect of Modern India".',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'In which year did India gain independence from British rule?',
    answer: '1947',
    hint: 'It is the year after World War II ended.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'What was the ancient university located in Nalanda known for?',
    answer: 'It was one of the first residential universities in the world.',
    hint: 'Located in Bihar.',
    solution: '',
  },
];

export async function seedDummyData() {
  // Check if decks already exist
  const existing = await db.getAllAsync<{ count: number }>('SELECT COUNT(*) as count FROM decks;');
  if (existing[0]?.count > 0) {
    console.log('ℹ️ Data already seeded.');
    return;
  }

  // Insert decks
  for (const deck of dummyDecks) {
    await db.runAsync(
      `INSERT INTO decks (id, slug, title, description, card_count, is_premium, cover_image_url, price_rupees, imported_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        deck.id,
        deck.slug,
        deck.title,
        deck.description,
        deck.card_count,
        deck.is_premium,
        deck.cover_image_url,
        deck.price_rupees,
        deck.imported_at,
      ]
    );
  }

  // Insert cards
  for (const card of dummyCards) {
    const deck = dummyDecks.find(d => d.slug === card.deckSlug);
    if (!deck) continue;
    await db.runAsync(
      `INSERT INTO cards (id, deck_id, question, answer, hint, solution, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [uuid.v4() as string, deck.id, card.question, card.answer, card.hint, card.solution, Date.now()]
    );
  }

  console.log('✅ Dummy data seeded successfully.');
}
