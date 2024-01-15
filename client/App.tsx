import { useEffect, useState } from "react";
import "./App.css";
import FeedList from "./components/FeedList";
import { Box, Drawer, Modal as MuiModal, Typography } from "@mui/material";
import { ModalProvider, useModal } from "./components/ModalContext";
import Modal from "./components/Modal";
import { FeedItem } from "./types";

function App() {
  const [feedData, setFeedData] = useState<FeedItem[]>([]);

  const { openModal } = useModal();

  useEffect(() => {
    fetch("http://localhost:4000/feed")
      .then((response) => response.json())
      .then((data) => {
        console.log("data :", data);

        setFeedData(data);
      });
  }, []);

  useEffect(() => {
    if (feedData) {
      // const [feedItem] = feedData;
      openModal({ feedItem: feedData[5] });
    }
  }, [feedData]);

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
