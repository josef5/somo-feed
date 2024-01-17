import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Box, CardHeader, CardMedia, Typography } from "@mui/material";
import { useModal } from "./ModalContext";

interface FeedItem {
  briefref: string;
  brand: {
    name: string;
    logo: string;
  };
  name: string;
  description: string;
  feed_title: string;
  banner_text: string;
  banner_image: string;
  ad_1_image: string;
  ad_2_image: string;
  starts_on: string;
}

/**
 * FeedList is a functional component that takes an array of FeedItem objects as props.
 * It uses the ModalContext to provide a modal that can be opened with a FeedItem.
 * Each FeedItem is displayed in a Card component from the Material UI library.
 * The Card displays the brand logo, brand name, and a button to join the brief.
 * Clicking on the button or the banner image opens the modal with the corresponding FeedItem.
 */
const FeedList: React.FunctionComponent<{ data: FeedItem[] }> = (props) => {
  const { data } = props;
  const { openModal } = useModal();

  return (
    <>
      {data.map((item, index) => (
        <Card sx={{ width: 345, position: "relative" }} key={index}>
          <CardHeader
            avatar={
              <Box
                component="img"
                src={item.brand.logo}
                aria-label="logo"
                height={40}
                width={40}
                sx={{ objectFit: "contain" }}
                marginLeft={"10px"}
              ></Box>
            }
            action={
              <Button
                onClick={() => openModal({ feedItem: item })}
                sx={{ margin: "10px 8px" }}
              >
                Join brief now
              </Button>
            }
            title={item.brand.name}
            titleTypographyProps={{ fontSize: 16, fontWeight: "bold" }}
            sx={{ padding: "4px", height: "50px" }}
          />
          <Box
            onClick={() => openModal({ feedItem: item })}
            sx={{ cursor: "pointer" }}
          >
            <CardMedia
              component="img"
              height="250"
              image={item.banner_image}
              alt={item.feed_title}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                textShadow:
                  "1px 1px 2px rgba(0, 0, 0, 1), 1px 1px 4px rgba(0, 0, 0, 1)",
                color: "white",
                padding: "8px",
              }}
            >
              {item.feed_title}
            </Typography>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default FeedList;
