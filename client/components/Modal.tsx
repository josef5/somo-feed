import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Drawer,
  Modal as MuiModal,
  Typography,
} from "@mui/material";
import { useModal } from "./ModalContext";
import { FeedItem, Comment, ScrollDirection } from "../types";

const drawerWidth = 500;

const Modal = () => {
  const [comments, setComments] = useState<Comment[]>();
  const [arrowButtonDisabled, setArrowButtonDisabled] = useState(
    ScrollDirection.UP
  );
  const { modalData, closeModal } = useModal();
  const { feedItem: item } = modalData ?? { feedItem: {} as FeedItem };
  const scrollContainer = useRef<HTMLDivElement>(null);
  let briefStartDate, formattedDate;

  // Format the date
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

  /**
   * This function is used to scroll the modal content up or down.
   * It takes a direction (up or down) as an argument.
   * The directionMultiplier is set to -1 for up and 1 for down.
   * The windowHeight is the height of the viewport.
   * The function then scrolls the modal content by the height of the viewport in the specified direction.
   * The scroll is smooth and the arrow button is disabled during the scroll.
   * @param direction - The direction to scroll. Can be up or down.
   */
  const scroll = (direction: ScrollDirection) => {
    const directionMultiplier = direction === ScrollDirection.UP ? -1 : 1;
    const windowHeight = window.innerHeight;

    setTimeout(() => {
      // NB. This value is linked to the disabled state of the arrow buttons.
      // Setting this during auto-scroll will cause a re-render which interferes
      // with the scroll animation
      setArrowButtonDisabled(direction);
    }, 800);

    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        top: windowHeight * directionMultiplier,
        behavior: "smooth",
      });
    }
  };

  /**
   * This useEffect hook is used to fetch comments for a specific brief.
   * It runs whenever the briefref of the item changes.
   * If the item has a briefref, it fetches comments from the server.
   * The server is expected to return a JSON array of Comment objects.
   * The fetched comments are then set to the comments state.
   */
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
          ref={scrollContainer}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              onClick={() => {
                closeModal();
                setArrowButtonDisabled(ScrollDirection.UP);
              }}
              sx={{
                position: "fixed",
                top: "1rem",
                left: "1rem",
                padding: 0,
                minWidth: "auto",
              }}
            >
              <Box
                component="img"
                src="/close-dialog.svg"
                alt=""
                sx={{ width: "2rem" }}
              />
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "black",
                flex: "100%",
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "510px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  onClick={() => scroll(ScrollDirection.UP)}
                  sx={{
                    padding: 0,
                    minWidth: "auto",
                    marginBottom: "1rem",
                  }}
                  disabled={arrowButtonDisabled === ScrollDirection.UP}
                >
                  <Box
                    component="img"
                    src="/switch-down.svg"
                    alt=""
                    sx={{
                      width: "2rem",
                      transform: "scaleY(-1)",
                      filter:
                        arrowButtonDisabled === "up"
                          ? "invert(95%) sepia(0%) saturate(0%) hue-rotate(207deg) brightness(200%) contrast(20%)"
                          : "none",
                    }}
                  />
                </Button>
                <Button
                  onClick={() => scroll(ScrollDirection.DOWN)}
                  sx={{
                    padding: 0,
                    minWidth: "auto",
                  }}
                  disabled={arrowButtonDisabled === ScrollDirection.DOWN}
                >
                  <Box
                    component="img"
                    src="/switch-down.svg"
                    alt=""
                    sx={{
                      width: "2rem",
                      filter:
                        arrowButtonDisabled === ScrollDirection.DOWN
                          ? "invert(95%) sepia(0%) saturate(0%) hue-rotate(207deg) brightness(200%) contrast(20%)"
                          : "none",
                    }}
                  />
                </Button>
              </Box>
              <Card
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
                  borderRadius: 0,
                }}
                elevation={0}
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
                  backgroundColor: "hsl(0, 0%, 95%)",
                  border: "none",
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
                sx={{ backgroundColor: "white" }}
              />
              {comments &&
                comments.map((comment, index) => (
                  <Card
                    key={index}
                    sx={{ backgroundColor: "transparent" }}
                    elevation={0}
                  >
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
