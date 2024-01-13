import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import { Avatar, CardHeader, CardMedia, Typography } from "@mui/material";

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
  // console.log("data :", data);

  return (
    <>
      {data.map((item, index) => (
        <Card sx={{ width: 345, position: "relative" }} key={index}>
          <CardHeader
            avatar={<Avatar src={item.brand.logo} aria-label="logo"></Avatar>}
            action={<Button>Join brief now</Button>}
            title={item.brand.name}
          />
          <CardMedia
            component="img"
            height="194"
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
          {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
        </Card>
      ))}
    </>
  );
  // return <pre>{JSON.stringify(feedData, null, 2)}</pre>;
};

export default FeedList;
