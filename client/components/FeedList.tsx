import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

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
  console.log("data :", data);

  return (
    <>
      {/* <Button variant="outlined">Hello world</Button>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="http://localhost:4000/images/audi-banner.jpeg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </Card> */}
      {data.map((item) => (
        <pre key={item.briefref}>{JSON.stringify(item, null, 2)}</pre>
      ))}
    </>
  );
  // return <pre>{JSON.stringify(feedData, null, 2)}</pre>;
};

export default FeedList;
