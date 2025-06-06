import { useState } from "react";
import type { CardItem } from "../types/types";
import "./cardsView.css";

interface CardsViewProps {
    cards: CardItem[];
  }
  export default function CardsView({ cards }: CardsViewProps) {
    const [count, setCount] = useState<number>(0);
    return (
      <div>
        <div className="cardsView">
          {cards.map((card, index) => {
            return index < 3 ? <CardView key={index} {...card} /> : null;
          })}
        </div>
      </div>
    );
  }
  function CardView({ title, description, image }: CardItem) {
    return (
      <div className="card">
        <div className="image" style={{ backgroundImage: `url(${image})` }}>
          <img src="null" alt="" />
        </div>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
    );
  }