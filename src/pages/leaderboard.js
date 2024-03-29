import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../api/firebase";
import { useState, useEffect } from "react";
import Leaderboard from "../utils/dataTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  useEffect(() => {
    const app = initializeApp(firebaseConfig); // Initialize Firebase
    const db = getFirestore(app);
    const fetchData = async () => {
      const leaderboardDocRef = doc(db, "leaderboard", "data"); // get Reference to the leaderboard collection
      const docSnap = await getDoc(leaderboardDocRef); // get the leaderboard data
      console.log("leaderboard data fetched successfully");
      // sort the list by the highest turn score
      const data = docSnap.data()["scores"];
      const sorted = data.sort(GetSortOrder("turns_played")).reverse();

      setLeaderboard(sorted); // set leaderboard state
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Impossible Chess</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Header />
      <section className="hero">
        <div className="container">
          <h1>Leaderboard</h1>
        </div>
      </section>
      <section className="chess">
        <div className="container">
          <Leaderboard />
        </div>
      </section>
      <Footer />
    </>
  );
}

export { LeaderboardPage };
