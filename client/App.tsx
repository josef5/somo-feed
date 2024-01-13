import { useEffect, useState } from "react";
import "./App.css";
import FeedList from "./components/FeedList";

function App() {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/feed")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setFeedData(data);
      });
  }, []);

  return (
    <div className="App">
      <FeedList data={feedData} />
    </div>
  );
}

export default App;
