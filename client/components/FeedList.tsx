import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Avatar, Box, CardHeader, CardMedia, Typography } from "@mui/material";
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

const FeedList: React.FunctionComponent<{ data: FeedItem[] }> = (props) => {
  const { data } = props;
  const { openModal } = useModal();

  return (
    <>
      {data.map((item, index) => (
        <Card
          // onClick={() => openModal({ feedItem: item })}
          sx={{ width: 345, position: "relative" }}
          key={index}
        >
          <CardHeader
            avatar={
              <Box
                component="img"
                src={item.brand.logo}
                aria-label="logo"
                height={40}
                width={40}
                sx={{ objectFit: "contain" /* backgroundColor: "gray" */ }}
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
              height="200"
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
