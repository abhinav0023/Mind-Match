import React from "react";
import "./Card.css";

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="front Card" />
          <img
            className="back"
            onClick={handleClick}
            src="/img/cover.png"
            alt="front Card"
          />
        </div>
      </div>
    </>
  );
}

export default Card;
