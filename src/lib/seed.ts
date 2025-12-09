import { db } from "./db";
import uuid from "react-native-uuid";
import { upsertTotalCardsProgress } from "@/db/deck.queries";

const dummyDecks = [
  {
    id: uuid.v4() as string,
    slug: "javascript-basics",
    title: "JavaScript Basics",
    description:
      "Learn the fundamentals of JavaScript, the programming language of the web.",
    card_count: 3,
    is_premium: 0,
    language: "english",
    price_rupees: 0.0,
    imported_at: Date.now(),
  },
  {
    id: uuid.v4() as string,
    slug: "indian-history",
    title: "Indian History",
    description:
      "Explore the rich and diverse history of India from ancient to modern times.",
    card_count: 3,
    is_premium: 1,
    language: "english",
    price_rupees: 49.0,
    imported_at: Date.now(),
  },
];

const dummyCards = [
  {
    deckSlug: "javascript-basics",
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that retains access to its lexical scope even when executed outside that scope.",
    hint: "Think about functions inside functions.",
    solution:
      "A closure allows a function to access variables from an enclosing scope even after that scope has finished executing.",
    options: [
      "A closure is a function that retains access to its lexical scope even when executed outside that scope.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What keyword declares a constant variable in JavaScript?",
    answer: "`const` keyword",
    hint: 'It starts with "c".',
    solution: "",
    options: ["`const` keyword", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is the difference between == and === in JavaScript?",
    answer: "`==` checks value with coercion; `===` checks without coercion.",
    hint: "One is strict.",
    solution: "",
    options: [
      "`==` checks value with coercion; `===` checks without coercion.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },

  // --- NEWLY ADDED (JS) ---

  {
    deckSlug: "javascript-basics",
    question: "What does NaN stand for?",
    answer: "Not-a-Number",
    hint: "It appears when math fails.",
    solution: "",
    options: ["Not-a-Number", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What type does typeof null return?",
    answer: "`object`",
    hint: "A long-standing JS quirk.",
    solution: "",
    options: ["`object`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is an IIFE?",
    answer: "Immediately Invoked Function Expression",
    hint: "Runs instantly.",
    solution: "",
    options: [
      "Immediately Invoked Function Expression",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is hoisting?",
    answer:
      "JavaScript moves variable and function declarations to the top of their scope.",
    hint: "JS lifts things up.",
    solution: "",
    options: [
      "JavaScript moves variable and function declarations to the top of their scope.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is the default value of an uninitialized variable?",
    answer: "`undefined`",
    hint: "Not null.",
    solution: "",
    options: ["`undefined`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is the purpose of `use strict`?",
    answer:
      "It enables strict mode to catch common errors and prevent unsafe actions.",
    hint: "Used at the top of scripts.",
    solution: "",
    options: [
      "It enables strict mode to catch common errors and prevent unsafe actions.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What does JSON stand for?",
    answer: "JavaScript Object Notation",
    hint: "Used for API data.",
    solution: "",
    options: ["JavaScript Object Notation", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What array method adds an element to the end?",
    answer: "`push()`",
    hint: "Opposite of pop.",
    solution: "",
    options: ["`push()`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "Which array method removes the first element?",
    answer: "`shift()`",
    hint: "Left side removal.",
    solution: "",
    options: ["`shift()`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question:
      "Which array method returns a new array without modifying the original?",
    answer: "`map()`, `filter()`, `slice()` and more.",
    hint: "Functional programming.",
    solution: "",
    options: [
      "`map()`, `filter()`, `slice()` and more.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is a promise in JavaScript?",
    answer:
      "An object representing eventual completion or failure of an asynchronous operation.",
    hint: "Async operations.",
    solution: "",
    options: [
      "An object representing eventual completion or failure of an asynchronous operation.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "Which keyword is used with promises for async code?",
    answer: "`await`",
    hint: "Pauses execution.",
    solution: "",
    options: ["`await`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is an arrow function?",
    answer: "A shorter syntax for writing functions using `=>`.",
    hint: "Introduced in ES6.",
    solution: "",
    options: [
      "A shorter syntax for writing functions using `=>`.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "Do arrow functions have their own `this`?",
    answer: "No, they inherit `this` from the parent scope.",
    hint: "Lexical this.",
    solution: "",
    options: [
      "No, they inherit `this` from the parent scope.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is event bubbling?",
    answer: "Events propagate from the target element up to the root.",
    hint: "Opposite of capturing.",
    solution: "",
    options: [
      "Events propagate from the target element up to the root.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is event capturing?",
    answer: "Events are captured from the root down to the target.",
    hint: "Reverse of bubbling.",
    solution: "",
    options: [
      "Events are captured from the root down to the target.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    hint: "HTML structure.",
    solution: "",
    options: ["Document Object Model", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "Which method selects an element by id?",
    answer: "`document.getElementById()`",
    hint: "Classic selector.",
    solution: "",
    options: [
      "`document.getElementById()`",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "Which method selects the first element matching a CSS selector?",
    answer: "`document.querySelector()`",
    hint: "Very flexible.",
    solution: "",
    options: ["`document.querySelector()`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is localStorage used for?",
    answer: "Storing key-value data that persists even after refreshing.",
    hint: "Client-side persistence.",
    solution: "",
    options: [
      "Storing key-value data that persists even after refreshing.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is sessionStorage?",
    answer: "Stores key-value data that lasts until the browser tab closes.",
    hint: "Short-lived storage.",
    solution: "",
    options: [
      "Stores key-value data that lasts until the browser tab closes.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },

  {
    deckSlug: "javascript-basics",
    question: "What does `===` prevent?",
    answer: "Type coercion.",
    hint: "Strict.",
    solution: "",
    options: ["Type coercion.", "Option A", "Option B", "Option C"],
  },

  {
    deckSlug: "javascript-basics",
    question: "How do you convert a string to a number?",
    answer: "`Number()`, `parseInt()`, `parseFloat()`",
    hint: "Multiple ways.",
    solution: "",
    options: [
      "`Number()`, `parseInt()`, `parseFloat()`",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is template literal syntax?",
    answer: "Using backticks and ${} for interpolation.",
    hint: "Backticks.",
    solution: "",
    options: [
      "Using backticks and ${} for interpolation.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is destructuring?",
    answer: "Extracting values from arrays or objects into variables.",
    hint: "ES6 feature.",
    solution: "",
    options: [
      "Extracting values from arrays or objects into variables.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is the spread operator?",
    answer: "`...` used to expand arrays/objects.",
    hint: "Three dots.",
    solution: "",
    options: [
      "`...` used to expand arrays/objects.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "How do you check if a variable is an array?",
    answer: "`Array.isArray()`",
    hint: "Built-in method.",
    solution: "",
    options: ["`Array.isArray()`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is a higher-order function?",
    answer:
      "A function that takes another function as an argument or returns one.",
    hint: "map/filter are examples.",
    solution: "",
    options: [
      "A function that takes another function as an argument or returns one.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is a callback function?",
    answer: "A function passed into another function as an argument.",
    hint: "Async patterns.",
    solution: "",
    options: [
      "A function passed into another function as an argument.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is the global object in browsers?",
    answer: "`window`",
    hint: "Top-level.",
    solution: "",
    options: ["`window`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is `undefined`?",
    answer: "A variable that has been declared but not assigned a value.",
    hint: "Uninitialized.",
    solution: "",
    options: [
      "A variable that has been declared but not assigned a value.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is `null`?",
    answer: "An intentional absence of any value.",
    hint: "Used on purpose.",
    solution: "",
    options: [
      "An intentional absence of any value.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is polymorphism in JS?",
    answer:
      "Methods behaving differently based on the object implementing them.",
    hint: "OOP concept.",
    solution: "",
    options: [
      "Methods behaving differently based on the object implementing them.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "What is prototypal inheritance?",
    answer: "Objects inherit properties from other objects via prototypes.",
    hint: "JS inheritance.",
    solution: "",
    options: [
      "Objects inherit properties from other objects via prototypes.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "javascript-basics",
    question: "Which keyword creates a class?",
    answer: "`class`",
    hint: "Introduced in ES6.",
    solution: "",
    options: ["`class`", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "javascript-basics",
    question: "What method is a class constructor?",
    answer: "`constructor()`",
    hint: "Initializes objects.",
    solution: "",
    options: ["`constructor()`", "Option A", "Option B", "Option C"],
  },

  // ========== INDIAN HISTORY ==========

  {
    deckSlug: "indian-history",
    question: "Who was the first Prime Minister of India?",
    answer: "Jawaharlal Nehru",
    hint: "Known as Architect of Modern India.",
    solution: "",
    options: ["Jawaharlal Nehru", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "In which year did India gain independence?",
    answer: "1947",
    hint: "Post World War II.",
    solution: "",
    options: ["1947", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "What was the ancient university located in Nalanda known for?",
    answer: "One of the first residential universities in the world.",
    hint: "Located in Bihar.",
    solution: "",
    options: [
      "One of the first residential universities in the world.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },

  // --- NEWLY ADDED HISTORY ---

  {
    deckSlug: "indian-history",
    question: "Who was the first President of India?",
    answer: "Dr. Rajendra Prasad",
    hint: "Served two terms.",
    solution: "",
    options: ["Dr. Rajendra Prasad", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who wrote the Indian National Anthem?",
    answer: "Rabindranath Tagore",
    hint: "Nobel laureate.",
    solution: "",
    options: ["Rabindranath Tagore", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "What movement did Mahatma Gandhi start in 1942?",
    answer: "Quit India Movement",
    hint: "Began on 8 August.",
    solution: "",
    options: ["Quit India Movement", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who was the last Viceroy of India?",
    answer: "Lord Mountbatten",
    hint: "Oversaw independence.",
    solution: "",
    options: ["Lord Mountbatten", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Which empire built the Taj Mahal?",
    answer: "The Mughal Empire",
    hint: "Shah Jahan.",
    solution: "",
    options: ["The Mughal Empire", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who was known as the Iron Man of India?",
    answer: "Sardar Vallabhbhai Patel",
    hint: "United princely states.",
    solution: "",
    options: ["Sardar Vallabhbhai Patel", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "When did the Battle of Plassey take place?",
    answer: "1757",
    hint: "British foothold in India.",
    solution: "",
    options: ["1757", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who founded the Maurya Empire?",
    answer: "Chandragupta Maurya",
    hint: "Mentored by Chanakya.",
    solution: "",
    options: ["Chandragupta Maurya", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who was the first woman Prime Minister of India?",
    answer: "Indira Gandhi",
    hint: "Daughter of Nehru.",
    solution: "",
    options: ["Indira Gandhi", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question:
      "Which act was passed in 1935 that laid a foundation for the Constitution?",
    answer: "Government of India Act 1935",
    hint: "Longest act by British Parliament.",
    solution: "",
    options: [
      "Government of India Act 1935",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "indian-history",
    question: "Who was the founder of the Sikh religion?",
    answer: "Guru Nanak",
    hint: "First Sikh Guru.",
    solution: "",
    options: ["Guru Nanak", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "In which year did the Jallianwala Bagh massacre happen?",
    answer: "1919",
    hint: "Amritsar.",
    solution: "",
    options: ["1919", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who built the Red Fort in Delhi?",
    answer: "Shah Jahan",
    hint: "Mughal architecture.",
    solution: "",
    options: ["Shah Jahan", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "What is the period of the Indus Valley Civilization?",
    answer: "3300–1300 BCE",
    hint: "Harappan.",
    solution: "",
    options: ["3300–1300 BCE", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Where did Buddha attain enlightenment?",
    answer: "Bodh Gaya",
    hint: "Under Bodhi tree.",
    solution: "",
    options: ["Bodh Gaya", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who wrote Arthashastra?",
    answer: "Chanakya (Kautilya)",
    hint: "Advisor to Chandragupta.",
    solution: "",
    options: ["Chanakya (Kautilya)", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who was known as the Napoleon of India?",
    answer: "Samudragupta",
    hint: "Gupta empire.",
    solution: "",
    options: ["Samudragupta", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "What was the capital of the Vijayanagara Empire?",
    answer: "Hampi",
    hint: "UNESCO site.",
    solution: "",
    options: ["Hampi", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who was the first Mughal emperor?",
    answer: "Babur",
    hint: "Battle of Panipat (1526).",
    solution: "",
    options: ["Babur", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who introduced the Permanent Settlement in Bengal?",
    answer: "Lord Cornwallis",
    hint: "1793.",
    solution: "",
    options: ["Lord Cornwallis", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "What is the Rigveda?",
    answer: "The oldest of the four Vedas.",
    hint: "Ancient hymns.",
    solution: "",
    options: [
      "The oldest of the four Vedas.",
      "Option A",
      "Option B",
      "Option C",
    ],
  },
  {
    deckSlug: "indian-history",
    question: "Who led the revolt of 1857 in Jhansi?",
    answer: "Rani Lakshmibai",
    hint: "Warrior queen.",
    solution: "",
    options: ["Rani Lakshmibai", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "What was the capital of the Maratha Empire?",
    answer: "Pune",
    hint: "Peshwas governed from here.",
    solution: "",
    options: ["Pune", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Which Indian leader formed the Forward Bloc?",
    answer: "Subhas Chandra Bose",
    hint: "Netaji.",
    solution: "",
    options: ["Subhas Chandra Bose", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who discovered the sea route to India?",
    answer: "Vasco da Gama",
    hint: "Reached Calicut.",
    solution: "",
    options: ["Vasco da Gama", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "When did the Delhi Sultanate begin?",
    answer: "1206",
    hint: "Qutb-ud-din Aibak.",
    solution: "",
    options: ["1206", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Which British law allowed arrest without warrant?",
    answer: "Rowlatt Act",
    hint: "Sparked nationwide protests.",
    solution: "",
    options: ["Rowlatt Act", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who formed the Arya Samaj?",
    answer: "Swami Dayananda Saraswati",
    hint: "Return to Vedas.",
    solution: "",
    options: ["Swami Dayananda Saraswati", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who founded the Indian National Congress?",
    answer: "A.O. Hume",
    hint: "1885.",
    solution: "",
    options: ["A.O. Hume", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who discovered the Indus Valley sites of Harappa?",
    answer: "Daya Ram Sahni",
    hint: "1921.",
    solution: "",
    options: ["Daya Ram Sahni", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who was known as the Lion of Punjab?",
    answer: "Lala Lajpat Rai",
    hint: "Lal-Bal-Pal trio.",
    solution: "",
    options: ["Lala Lajpat Rai", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Which movement included the Chauri-Chaura incident?",
    answer: "Non-Cooperation Movement",
    hint: "Gandhi called it off.",
    solution: "",
    options: ["Non-Cooperation Movement", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "When was the Indian Constitution adopted?",
    answer: "26 November 1949",
    hint: "Constitution Day.",
    solution: "",
    options: ["26 November 1949", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Who was the first Indian woman to become President?",
    answer: "Pratibha Patil",
    hint: "Served 2007–2012.",
    solution: "",
    options: ["Pratibha Patil", "Option A", "Option B", "Option C"],
  },
  {
    deckSlug: "indian-history",
    question: "Which empire is known as the Golden Age of India?",
    answer: "Gupta Empire",
    hint: "Classical period.",
    solution: "",
    options: ["Gupta Empire", "Option A", "Option B", "Option C"],
  },
];

export async function seedDummyData() {
  // Check if decks already exist
  const existingDecks = await db.getAllAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM decks;"
  );
  const existingCards = await db.getAllAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM cards;"
  );
  if (existingDecks[0]?.count > 0 && existingCards[0]?.count > 0) {
    console.log(
      "ℹ️ Data already seeded.",
      existingDecks[0].count,
      existingCards[0].count
    );
    return;
  } else {
    console.log("ℹ️ Seeding data...");
  }

  // Insert decks
  for (const deck of dummyDecks) {
    await db.runAsync(
      `INSERT INTO decks (id, slug, title, description, card_count, is_premium, language, price_rupees, imported_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        deck.id,
        deck.slug,
        deck.title,
        deck.description,
        deck.card_count,
        deck.is_premium,
        deck.language,
        deck.price_rupees,
        deck.imported_at,
      ]
    );
  }

  // Insert cards
  for (const card of dummyCards) {
    const deck = dummyDecks.find((d) => d.slug === card.deckSlug);
    if (!deck) continue;
    await db.runAsync(
      `INSERT INTO cards (id, deck_id, question, answer, hint, solution, options, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        uuid.v4() as string,
        deck.id,
        card.question,
        card.answer,
        card.hint,
        card.solution,
        JSON.stringify(card.options),
        Date.now(),
      ]
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
      [deck.id, deck.id]
    );
  }

  // Initialize deck_progress.total_cards from actual card counts
  for (const deck of dummyDecks) {
    const rows = await db.getAllAsync<{ total: number }>(
      "SELECT COUNT(*) as total FROM cards WHERE deck_id = ?;",
      [deck.id]
    );
    const totalCards = rows[0]?.total ?? 0;
    await upsertTotalCardsProgress(deck.id, totalCards);
  }

  console.log("✅ Dummy data seeded successfully.");
}
