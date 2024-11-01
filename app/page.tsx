import styles from "../styles/home.module.css";
import Card from "../components/Card";

async function getBillionaires() {
  try {
    const url = "https://billions-api.nomadcoders.workers.dev/";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

export default async function Home() {
  const billionaires = await getBillionaires();

  return <ul className={styles.container}>{billionaires?.map((person) => <Card key={person.id} {...person} />)}</ul>;
}
