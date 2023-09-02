import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";

// Store the images in the form of an array
const cardImg = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  // React State for cards and turns for the user
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  // Making two card choices
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  // state for the disabled cards 
  const[disabled,setDisabled] = useState(false);

  // Function to check if the cards are the same
  // and shuffle the cards
  const shuffleCard = () => {
    // --> Doubling the cards
    const shuffledCard = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5) // Shuffle the cards randomly
      .map((card) => ({ ...card, id: Math.random() })); // Assign a unique ID to each card
      setCard1(null)
      setCard2(null)

    setCards(shuffledCard); // Update the state with shuffled cards
    setTurns(0); // Reset the number of turns to zero
  };

  // Handle the choice of cards
  const handleChoice = (card) => {
    card1 ? setCard2(card) : setCard1(card); // Set the first or second card choice based on whether card1 is already selected
  };

  // Compare two selected cards
  useEffect(() => {
    if (card1 && card2) {
      setDisabled(true);
      if (card1.src === card2.src) { // If the two cards have the same image source
        setCards((preCards) => {
          return preCards.map((card) => {
            if (card.src === card1.src) {
              return { ...card, matched: true }; // Mark both cards as matched
            } else {
              return card;
            }
          });
        });

        reset(); // Reset the card choices
        // For a delay so that the user can see the cards if they match or not
      } else {
        setTimeout(() => reset(), 1000); // Delay of 1000 milliseconds (1 second) before resetting
      }
    }
  }, [card1, card2]);

  // Reset choices and increase the number of turns
  const reset = () => {
    setCard1(null); // Reset the first card choice
    setCard2(null); // Reset the second card choice
    setTurns((preTurn) => preTurn + 1); // Increment the number of turns by 1
    setDisabled(false); 
  };

  return (
    <div className="App">
      <h1>Mind-Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      {/* Adding the grid for cards */}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id} // Use the unique ID as the key for each card
            card={card} // Pass the card data as a prop to the Card component
            handleChoice={handleChoice} // Pass the handleChoice function as a prop to the Card component
            flipped={card === card1 || card === card2 || card.matched} // Determine if the card should be flipped based on the selected cards and whether it's already matched
            disabled={disabled}
          />
        ))}
      </div>
      <p>
          Turns : {turns}
      </p>
    </div>
  );
}

export default App;
