export const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
export const values = [
  { name: 'Ace', value: 11 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: 'Jack', value: 10 },
  { name: 'Queen', value: 10 },
  { name: 'King', value: 10 }
];

export function createDeck() {
  const deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ ...value, suit });
    });
  });
  return shuffle(deck);
}

export function shuffle(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

export function calculateScore(hand) {
  let score = hand.reduce((acc, card) => acc + card.value, 0);
  const aces = hand.filter(card => card.name === 'Ace');
  while (score > 21 && aces.length > 0) {
    score -= 10;
    aces.pop();
  }
  return score;
}

export function dealInitialHands(deck) {
  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];
  return { playerHand, dealerHand, deck };
}

export function hit(deck, hand) {
  hand.push(deck.pop());
  return { hand, deck };
}
