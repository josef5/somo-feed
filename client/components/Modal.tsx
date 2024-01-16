import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Drawer,
  Grid,
  Modal as MuiModal,
  Typography,
} from "@mui/material";
import { useModal } from "./ModalContext";
import { FeedItem, Comment } from "../types";

const drawerWidth = 500;

const Modal = () => {
  const [comments, setComments] = useState<Comment[]>();
  const { modalData, closeModal, openModal } = useModal();
  const { feedItem: item } = modalData ?? { feedItem: {} as FeedItem };

  let briefStartDate, formattedDate;

  if (item?.starts_on) {
    briefStartDate = new Date(item?.starts_on);
    formattedDate =
      briefStartDate &&
      briefStartDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
  }

  useEffect(() => {
    if (item?.briefref) {
      fetch(`http://localhost:4000/comments/${item.briefref}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data);
          console.log("comments :", data);
        });
    }
  }, [item?.briefref]);

  return (
    <>
      {modalData && item && (
        <MuiModal
          open={true}
          onClose={() => {}}
          sx={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              // className="LEFT-BOX"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "black",
                overflowY: "scroll",
                // gap: 20,
              }}
            >
              <Card
                // className="IMAGE-CONTAINER"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "black",
                  flex: "1 1 auto",
                  height: "100vh",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "contain",
                    width: "55%",
                  }}
                  image={item.banner_image}
                  alt={item.feed_title}
                />
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "100vh",
                  flex: "1 1 auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 0,
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      objectFit: "contain",
                      width: "60px",
                      margin: "20px",
                    }}
                    image={item.brand.logo}
                  />
                  <Typography variant="h6" gutterBottom>
                    {item.feed_title}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {formattedDate}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {item.banner_text}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      objectFit: "contain",
                      flex: "1 1 auto",
                      maxHeight: "50%",
                      maxWidth: "auto",
                    }}
                    image={item.ad_1_image}
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      height: "100%",
                      objectFit: "contain",
                      flex: "1 1 auto",
                      maxHeight: "50%",
                      maxWidth: "auto",
                    }}
                    image={item.ad_2_image}
                  />
                </Box>
              </Card>
            </Box>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="permanent"
              anchor="right"
            >
              <CardHeader
                avatar={
                  <Avatar src={item.brand.logo} aria-label="logo"></Avatar>
                }
                title={item.brand.name}
              />
              {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(comments, null, 2)}</pre> */}
              {comments &&
                comments.map((comment, index) => (
                  <Card key={index}>
                    <CardContent>
                      <Avatar src={comment.user.avatar} />
                      <Typography variant="h6">{comment.user.name}</Typography>
                      <Typography variant="body1">{comment.comment}</Typography>
                    </CardContent>
                  </Card>
                ))}
            </Drawer>
          </Box>
        </MuiModal>
      )}
    </>
  );
};

export default Modal;
