import React from "react";
import styles from "../../../styles/person.module.css";

interface IFinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice?: number;
}

interface IPersonInfo {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: IFinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

async function getOneBillionaire(id: string) {
  try {
    const url = `https://billions-api.nomadcoders.workers.dev/person/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const data: IPersonInfo = await getOneBillionaire(id);

  return {
    title: data.name,
    description: `${data.name}'s details`,
  };
}

async function Person({ params }) {
  const { id } = await params;

  const data: IPersonInfo = await getOneBillionaire(id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <img className={styles.image} src={data.squareImage} alt={`${data.name}'s image`} />
        <div className={styles.description}>
          <h3 className={styles.title}>{data.name}</h3>
          <div>Networth: {data.netWorth}</div>
          <div>Country: {data.country}</div>
          <div>Industry: {data.industries}</div>
          <p>{data.about}</p>
        </div>
      </div>
      <div className={styles.assets}>
        <h3 className={styles.title}>Financial Assets</h3>
        <ul className={styles.cardContainer}>
          {data?.financialAssets?.map((asset, i) => (
            <li key={`${i}-${asset.companyName}`} className={styles.card}>
              <div>Ticker : {asset.ticker}</div>
              <div>Shares : {asset.numberOfShares.toLocaleString()}</div>
              {asset.currentPrice && <div>Current Price : ${asset.currentPrice}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Person;
