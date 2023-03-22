//infinite scrolling
// fuzzy search
// filtering based on tag
// listing all subgreddits
// search bar
import { useNavigate } from "react-router-dom";
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



const handleleaveclick = async (cardId, event) => {
  // get request to backend to leave the allsubgreddits from the backend
  event.preventDefault();
  const subid = cardId;
  console.log(subid);
  try {
    const res = await axios.post(
      `/api/allsubgreddits/leave/` + subid,
      { id: localStorage.getItem("userid") }
    );
    alert(res.data);
  } catch (e) {
    console.log(e);
  }
};

const handlejoinclick = async (cardId, event) => {
  // get request to backend to join the allsubgreddits from the backend from the userid from localstorage.getItem("userid")
  event.preventDefault();
  const subid = cardId;
  console.log(subid);
  try {
    const res = await axios.post(
      `/api/allsubgreddits/join/${subid}`,
      { id: localStorage.getItem("userid") }
    );
    alert(res.data);
  } catch (e) {
    console.log(e);
  }
};

function CardGrid(props) {

  const navigate = useNavigate();
  const handleopenclick = async (cardId, event) => {
    event.preventDefault();
    const subid = cardId;
    console.log(subid);
    navigate(`/allsubgreddits/${subid}`);
  };
  const { numColumns, cards, joined } = props;
  const userid = localStorage.getItem('userid')
  // get ids from joined
  const joinedSubgredditsIds = joined.map(
    (subgreddit) => subgreddit._id
  );
  // get cards ids
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
                <Typography gutterBottom variant="h5" component="h2">
                  {card.Title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h4">
                  {card.Description}
                </Typography>
                {/* show list of banned words in typography with card.bannedwords list seperated by commas with map */}
                {card.BannedWords.map((word) => (
                  <Typography gutterBottom variant="h6" component="h4">
                    Banned: {word}
                  </Typography>
                ))}
                {card.Tags.map((word) => (
                  <Typography gutterBottom variant="h6" component="h4">
                    Tags: {word}
                  </Typography>
                ))}
                {/* show open and leave and buttons for the subgreddits that are in joined */}
                {joinedSubgredditsIds.includes(card._id) ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => handleopenclick(card._id,event)}
                    >
                      Open
                    </Button>
                      <Button
                        variant="contained"
                        onClick={(event) => handleleaveclick(card._id,event)}
                        disabled = {card.Moderator === userid}
                      >
                        Leave
                      </Button>
                    
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => handlejoinclick(card._id,event)}
                    >
                      Join
                    </Button>
                  </>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
export default CardGrid;
