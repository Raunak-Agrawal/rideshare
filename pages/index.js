import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Passenger from "../components/Passenger";
import Driver from "../components/Driver";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>
        <u>Passenger data</u>
      </h2>
      <Passenger />
      <h2>
        <u>Driver data</u>
      </h2>
      <Driver />
    </div>
  );
}
