import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CardGrid(props) {
  const navigate = useNavigate();
  const handleopenclick = async (card) => {
    // get request to backend to get the sunreddit data
    navigate("/mysubgreddits/" + card._id);
  };

  const handledelelteclick = async (card) => {
    console.log("Delete Clicked");
    // send a request to delete the subgreddit
    const subgredditid = card._id;
    const deleting = async (card) => {
      console.log("deleting");
      try {
        const res = await axios.post("/api/mysubgreddits/delete/" + subgredditid);
        const data = await res.data;
        console.log(data);
        // setSubgreddits(data);
        // setloaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    deleting();
    console.log("deleted");
  };
  const { numColumns, cards } = props;
  console.log(props);
  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={12 / numColumns}
        >
          <Card
            sx={{
              ml: 2,
              mr: 2,
              mt: 2,
              mb: 2,
              borderRadius: 2,
              boxShadow: 10,
              borderRadius: 5,
              overflow: "hidden",
              maxHeight: 300,
            }}
          >
            <CardActionArea>
              {/* <CardMedia
                component="img"
                alt={card.title}
                height="140"
                image={card.image}
                title={card.title}
              /> */}
              <CardContent>
                <Typography gutterBottom component="h2" variant="body1">
                  {card.Title}
                </Typography>

                <Typography gutterBottom component="h4" variant="body1">
                  {card.Description}
                </Typography>
                <Typography gutterBottom component="h4" variant="body1">
                  Members : {card.Members.length}
                </Typography>
                {/* show listof banned words in one line seperated by commas wher card.BannedWords is the listof bannedwords  */}
                <Typography gutterBottom component="h4" variant="body1">
                  Banned words: {card.BannedWords.map((word) => word + ",")}
                </Typography>
                {/* similarly for tags */}
                <Typography gutterBottom component="h4" variant="body1">
                  Tags: {card.Tags.map((tag) => tag + ",")}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleopenclick(card)}
                >
                  Open
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    ml: 2,
                  }}
                  onClick={() => handledelelteclick(card)}
                >
                  Delete
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
export default CardGrid;
