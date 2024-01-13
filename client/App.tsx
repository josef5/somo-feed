import { useEffect, useState } from "react";
import "./App.css";
import FeedList from "./components/FeedList";
import { Box } from "@mui/material";

function App() {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/feed")
      .then((response) => response.json())
      .then((data) => {
        console.log("data :", data);

        setFeedData(data);
      });
  }, []);

  return (
    <div className="App">
      <Box display="flex" flexDirection="column" alignItems="center">
        <FeedList data={feedData} />
      </Box>
    </div>
  );
}

export default App;
