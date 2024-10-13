import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createDeck, dealInitialHands, hit, calculateScore } from './blackjackLogic';





export default function App() {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const startGame = () => {
    const { playerHand, dealerHand, deck } = dealInitialHands(deck);
    setPlayerHand(playerHand);
    setDealerHand(dealerHand);
    setDeck(deck);
    setMessage('');
    setGameOver(false);
  };

  const playerHit = () => {
    const { hand, deck } = hit(deck, playerHand);
    setPlayerHand([...hand]);
    setDeck(deck);
    if (calculateScore(hand) > 21) {
      setMessage('You bust!');
      setGameOver(true);
    }
  };

  const dealerTurn = () => {
    let newDealerHand = [...dealerHand];
    while (calculateScore(newDealerHand) < 17) {
      const { hand, deck: updatedDeck } = hit(deck, newDealerHand);
      newDealerHand = hand;
      setDeck(updatedDeck);
    }
    setDealerHand(newDealerHand);
    checkWinner();
  };

  const checkWinner = () => {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage('You win!');
    } else if (playerScore === dealerScore) {
      setMessage('It\'s a draw!');
    } else {
      setMessage('Dealer wins!');
    }
    setGameOver(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>
      <Button title="Start Game" onPress={startGame} />
      <Text>Player's Hand ({calculateScore(playerHand)}):</Text>
      <Text>{playerHand.map(card => `${card.name} of ${card.suit}`).join(', ')}</Text>
      <Button title="Hit" onPress={playerHit} disabled={gameOver} />
      <Button title="Stand" onPress={dealerTurn} disabled={gameOver} />
      <Text>Dealer's Hand ({calculateScore(dealerHand)}):</Text>
      <Text>{dealerHand.map(card => `${card.name} of ${card.suit}`).join(', ')}</Text>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
