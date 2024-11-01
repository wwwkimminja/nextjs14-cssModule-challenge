import Link from "next/link";
import React from "react";
import styles from "./style.module.css";

type CardProps = {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
};
function Card(props: CardProps) {
  return (
    <li className={styles.box}>
      <Link href={`/person/${props.id}`}>
        <img className={styles.image} src={props.squareImage} alt={`${props.name}'s image`} />
        <div className={styles.description}>
          <div className={styles.name}>{props.name}</div>
          <span>
            {Math.round(props.netWorth / 1000)} Billion /{props.industries.join()}{" "}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default Card;
