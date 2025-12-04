import { db } from './db';
import uuid from 'react-native-uuid';
import { upsertTotalCardsProgress } from "@/db/deck.queries";

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
    answer: 'A closure is a function that retains access to its lexical scope even when executed outside that scope.',
    hint: 'Think about functions inside functions.',
    solution: 'A closure allows a function to access variables from an enclosing scope even after that scope has finished executing.',
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
    answer: '`==` checks value with coercion; `===` checks without coercion.',
    hint: 'One is strict.',
    solution: '',
  },

  // --- NEWLY ADDED (37 more below) ---

  {
    deckSlug: 'javascript-basics',
    question: 'What does NaN stand for?',
    answer: 'Not-a-Number',
    hint: 'It appears when math fails.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What type does typeof null return?',
    answer: '`object`',
    hint: 'A long-standing JS quirk.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is an IIFE?',
    answer: 'Immediately Invoked Function Expression',
    hint: 'Runs instantly.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is hoisting?',
    answer: 'JavaScript moves variable and function declarations to the top of their scope.',
    hint: 'JS lifts things up.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is the default value of an uninitialized variable?',
    answer: '`undefined`',
    hint: 'Not null.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is the purpose of `use strict`?',
    answer: 'It enables strict mode to catch common errors and prevent unsafe actions.',
    hint: 'Used at the top of scripts.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What does JSON stand for?',
    answer: 'JavaScript Object Notation',
    hint: 'Used for API data.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What array method adds an element to the end?',
    answer: '`push()`',
    hint: 'Opposite of pop.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'Which array method removes the first element?',
    answer: '`shift()`',
    hint: 'Left side removal.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'Which array method returns a new array without modifying the original?',
    answer: '`map()`, `filter()`, `slice()` and more.',
    hint: 'Functional programming.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is a promise in JavaScript?',
    answer: 'An object representing eventual completion or failure of an asynchronous operation.',
    hint: 'Async operations.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'Which keyword is used with promises for async code?',
    answer: '`await`',
    hint: 'Pauses execution.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is an arrow function?',
    answer: 'A shorter syntax for writing functions using `=>`.',
    hint: 'Introduced in ES6.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'Do arrow functions have their own `this`?',
    answer: 'No, they inherit `this` from the parent scope.',
    hint: 'Lexical this.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is event bubbling?',
    answer: 'Events propagate from the target element up to the root.',
    hint: 'Opposite of capturing.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is event capturing?',
    answer: 'Events are captured from the root down to the target.',
    hint: 'Reverse of bubbling.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What does DOM stand for?',
    answer: 'Document Object Model',
    hint: 'HTML structure.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'Which method selects an element by id?',
    answer: '`document.getElementById()`',
    hint: 'Classic selector.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'Which method selects the first element matching a CSS selector?',
    answer: '`document.querySelector()`',
    hint: 'Very flexible.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is localStorage used for?',
    answer: 'Storing key-value data that persists even after refreshing.',
    hint: 'Client-side persistence.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is sessionStorage?',
    answer: 'Stores key-value data that lasts until the browser tab closes.',
    hint: 'Short-lived storage.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What does `===` prevent?',
    answer: 'Type coercion.',
    hint: 'Strict.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'How do you convert a string to a number?',
    answer: '`Number()`, `parseInt()`, `parseFloat()`',
    hint: 'Multiple ways.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is template literal syntax?',
    answer: 'Using backticks and ${} for interpolation.',
    hint: 'Backticks.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is destructuring?',
    answer: 'Extracting values from arrays or objects into variables.',
    hint: 'ES6 feature.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is the spread operator?',
    answer: '`...` used to expand arrays/objects.',
    hint: 'Three dots.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'How do you check if a variable is an array?',
    answer: '`Array.isArray()`',
    hint: 'Built-in method.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is a higher-order function?',
    answer: 'A function that takes another function as an argument or returns one.',
    hint: 'map/filter are examples.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is a callback function?',
    answer: 'A function passed into another function as an argument.',
    hint: 'Async patterns.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is the global object in browsers?',
    answer: '`window`',
    hint: 'Top-level.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is `undefined`?',
    answer: 'A variable that has been declared but not assigned a value.',
    hint: 'Uninitialized.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is `null`?',
    answer: 'An intentional absence of any value.',
    hint: 'Used on purpose.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is polymorphism in JS?',
    answer: 'Methods behaving differently based on the object implementing them.',
    hint: 'OOP concept.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What is prototypal inheritance?',
    answer: 'Objects inherit properties from other objects via prototypes.',
    hint: 'JS inheritance.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'Which keyword creates a class?',
    answer: '`class`',
    hint: 'Introduced in ES6.',
    solution: '',
  },
  {
    deckSlug: 'javascript-basics',
    question: 'What method is a class constructor?',
    answer: '`constructor()`',
    hint: 'Initializes objects.',
    solution: '',
  },



  {
    deckSlug: 'indian-history',
    question: 'Who was the first Prime Minister of India?',
    answer: 'Jawaharlal Nehru',
    hint: 'Known as Architect of Modern India.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'In which year did India gain independence?',
    answer: '1947',
    hint: 'Post World War II.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'What was the ancient university located in Nalanda known for?',
    answer: 'One of the first residential universities in the world.',
    hint: 'Located in Bihar.',
    solution: '',
  },

  // --- NEWLY ADDED (37 more) ---
  {
    deckSlug: 'indian-history',
    question: 'Who was the first President of India?',
    answer: 'Dr. Rajendra Prasad',
    hint: 'Served two terms.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who wrote the Indian National Anthem?',
    answer: 'Rabindranath Tagore',
    hint: 'Nobel laureate.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'What movement did Mahatma Gandhi start in 1942?',
    answer: 'Quit India Movement',
    hint: 'Began on 8 August.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was the last Viceroy of India?',
    answer: 'Lord Mountbatten',
    hint: 'Oversaw independence.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Which empire built the Taj Mahal?',
    answer: 'The Mughal Empire',
    hint: 'Shah Jahan.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was known as the Iron Man of India?',
    answer: 'Sardar Vallabhbhai Patel',
    hint: 'United princely states.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'When did the Battle of Plassey take place?',
    answer: '1757',
    hint: 'British foothold in India.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who founded the Maurya Empire?',
    answer: 'Chandragupta Maurya',
    hint: 'Mentored by Chanakya.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was the first woman Prime Minister of India?',
    answer: 'Indira Gandhi',
    hint: 'Daughter of Nehru.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Which act was passed in 1935 that laid a foundation for the Constitution?',
    answer: 'Government of India Act 1935',
    hint: 'Longest act by British Parliament.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was the founder of the Sikh religion?',
    answer: 'Guru Nanak',
    hint: 'First Sikh Guru.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'In which year did the Jallianwala Bagh massacre happen?',
    answer: '1919',
    hint: 'Amritsar.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who built the Red Fort in Delhi?',
    answer: 'Shah Jahan',
    hint: 'Mughal architecture.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'What is the period of the Indus Valley Civilization?',
    answer: '3300–1300 BCE',
    hint: 'Harappan.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Where did Buddha attain enlightenment?',
    answer: 'Bodh Gaya',
    hint: 'Under Bodhi tree.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who wrote Arthashastra?',
    answer: 'Chanakya (Kautilya)',
    hint: 'Advisor to Chandragupta.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was known as the Napoleon of India?',
    answer: 'Samudragupta',
    hint: 'Gupta empire.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'What was the capital of the Vijayanagara Empire?',
    answer: 'Hampi',
    hint: 'UNESCO site.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was the first Mughal emperor?',
    answer: 'Babur',
    hint: 'Battle of Panipat (1526).',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who introduced the Permanent Settlement in Bengal?',
    answer: 'Lord Cornwallis',
    hint: '1793.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'What is the Rigveda?',
    answer: 'The oldest of the four Vedas.',
    hint: 'Ancient hymns.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who led the revolt of 1857 in Jhansi?',
    answer: 'Rani Lakshmibai',
    hint: 'Warrior queen.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'What was the capital of the Maratha Empire?',
    answer: 'Pune',
    hint: 'Peshwas governed from here.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Which Indian leader formed the Forward Bloc?',
    answer: 'Subhas Chandra Bose',
    hint: 'Netaji.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who discovered the sea route to India?',
    answer: 'Vasco da Gama',
    hint: 'Reached Calicut.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'When did the Delhi Sultanate begin?',
    answer: '1206',
    hint: 'Qutb-ud-din Aibak.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Which British law allowed arrest without warrant?',
    answer: 'Rowlatt Act',
    hint: 'Sparked nationwide protests.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who formed the Arya Samaj?',
    answer: 'Swami Dayananda Saraswati',
    hint: 'Return to Vedas.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who founded the Indian National Congress?',
    answer: 'A.O. Hume',
    hint: '1885.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who discovered the Indus Valley sites of Harappa?',
    answer: 'Daya Ram Sahni',
    hint: '1921.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was known as the Lion of Punjab?',
    answer: 'Lala Lajpat Rai',
    hint: 'Lal-Bal-Pal trio.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Which movement included the Chauri-Chaura incident?',
    answer: 'Non-Cooperation Movement',
    hint: 'Gandhi called it off.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'When was the Indian Constitution adopted?',
    answer: '26 November 1949',
    hint: 'Constitution Day.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Who was the first Indian woman to become President?',
    answer: 'Pratibha Patil',
    hint: 'Served 2007–2012.',
    solution: '',
  },
  {
    deckSlug: 'indian-history',
    question: 'Which empire is known as the Golden Age of India?',
    answer: 'Gupta Empire',
    hint: 'Classical period.',
    solution: '',
  },
];

export async function seedDummyData() {
  // Check if decks already exist
  const existingDecks = await db.getAllAsync<{ count: number }>('SELECT COUNT(*) as count FROM decks;');
  const existingCards = await db.getAllAsync<{ count: number }>('SELECT COUNT(*) as count FROM cards;');
  if (existingDecks[0]?.count > 0 && existingCards[0]?.count > 0) {
    console.log('ℹ️ Data already seeded.', existingDecks[0].count, existingCards[0].count);
    return;
  } else {
    console.log('ℹ️ Seeding data...');
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
      ],
    );
  }

  // Insert cards
  for (const card of dummyCards) {
    const deck = dummyDecks.find((d) => d.slug === card.deckSlug);
    if (!deck) continue;
    await db.runAsync(
      `INSERT INTO cards (id, deck_id, question, answer, hint, solution, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [uuid.v4() as string, deck.id, card.question, card.answer, card.hint, card.solution, Date.now()],
    );
  }

  // Recalculate card_count for each deck based on cards table
  for (const deck of dummyDecks) {
    await db.runAsync(
      `
      UPDATE decks
      SET card_count = (
        SELECT COUNT(*)
        FROM cards
        WHERE deck_id = ?
      )
      WHERE id = ?;
      `,
      [deck.id, deck.id],
    );
  }

  // Initialize deck_progress.total_cards from actual card counts
  for (const deck of dummyDecks) {
    const rows = await db.getAllAsync<{ total: number }>(
      "SELECT COUNT(*) as total FROM cards WHERE deck_id = ?;",
      [deck.id],
    );
    const totalCards = rows[0]?.total ?? 0;
    await upsertTotalCardsProgress(deck.id, totalCards);
  }

  console.log("✅ Dummy data seeded successfully.");
}

