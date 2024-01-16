import { useEffect, useState } from "react";
import "./App.css";
import FeedList from "./components/FeedList";
import { Box } from "@mui/material";
import Modal from "./components/Modal";
import { FeedItem } from "./types";

function App() {
  const [feedData, setFeedData] = useState<FeedItem[]>([]);

  const fetchData = () => {
    return fetch(
      `http://localhost:4000/feed?START=${feedData.length}&PAGE_SIZE=${5}`
    ).then((response) => response.json());
  };

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchData().then((data) => {
          setFeedData((d) => [...d, ...data]);
        });
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [feedData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData().then((data) => {
      setFeedData(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="App">
        <Modal />
        <Box display="flex" flexDirection="column" alignItems="center">
          <FeedList data={feedData} />
        </Box>
      </div>
    </>
  );
}

export default App;
