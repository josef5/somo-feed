import { useEffect, useState } from "react";
import "./App.css";
import FeedList from "./components/FeedList";
import { Box } from "@mui/material";
import Modal from "./components/Modal";
import { FeedItem } from "./types";

function App() {
  const [feedData, setFeedData] = useState<FeedItem[]>([]);

  /**
   * Fetches data from the server.
   * The server is expected to return a JSON array of FeedItem objects.
   * The start parameter is the current length of the feedData array.
   * The page size is set to 5.
   * @returns A Promise that resolves to the fetched data.
   */
  const fetchData = async () => {
    return fetch(
      `http://localhost:4000/feed?START=${feedData.length}&PAGE_SIZE=${5}`
    ).then((response) => response.json());
  };

  /**
   * This useEffect hook is used to handle infinite scrolling.
   * When the user scrolls to the bottom of the page, it fetches more data from the
   * server. The fetched data is then appended to the existing feedData state.
   * The event listener for scroll is cleaned up when the component is unmounted.
   *
   * NB. There is currently an issue if the content doesnt reach the bottom of the
   * page, whereupon no scrolling can take place. A possible solution would be to
   * check the size of the FeedList after the initial fetch and fetch more data if
   * space is available.
   */
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
