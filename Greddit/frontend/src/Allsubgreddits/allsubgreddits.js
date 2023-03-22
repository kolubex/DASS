// this file combines all the files like tags, cardgrid, searchbar, etc. and exports them as a single component
// Compare this snippet from frontend/src/Allsubgreddits/index.js:
import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import CardGrid from "./cardgrid";
import SearchBar from "./search";
// import Tags from "./tags";
import { Box } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import moment from "moment";
import Fuse from "fuse.js";
function Allsubgreddits() {
  const [subgreddits, setSubgreddits] = useState([]);
  const [search, setSearch] = useState("");
  const [render, setRender] = useState(false);
  const [filteredSubgredditsbysearch, setFilteredSubgredditssearch] = useState(
    []
  );
  const [fusesearch, setFuseSearch] = useState("");
  const [selectsortsubs, setSelectsortsubs] = useState([]);
  const [joinedSubgreddits, setJoinedSubgreddits] = useState([]);
  let sortedsubs = [];
  const [nameascend, setNameAscend] = useState(false);
  const [namedescend, setNameDescend] = useState(false);
  const [dateascend, setDateAscend] = useState(false);
  const [followersort, setFollowersort] = useState(false);
  const [fusesorting, setFuseSorting] = useState([]);
  // const [tag, setTag] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/allsubgreddits/");
        // console.log(res.data);
        setSubgreddits(res.data);
        console.log(subgreddits, "subgreddits");
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  // get joined subgreddits
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "/api/allsubgreddits/joinedsubgreddits/" +
            localStorage.getItem("userid")
        );
        setJoinedSubgreddits(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const joinedSubgredditsIds = joinedSubgreddits.map(
    (subgreddit) => subgreddit._id
  );
  const filteredSubgreddits = subgreddits.filter((subgreddit) =>
    joinedSubgredditsIds.includes(subgreddit._id)
  );
  const otherSubgreddits = subgreddits.filter(
    (subgreddit) => !joinedSubgredditsIds.includes(subgreddit._id)
  );
  sortedsubs = [...filteredSubgreddits, ...otherSubgreddits];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setFilteredSubgredditssearch(
      sortedsubs.filter((subgreddit) =>
        subgreddit.Title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);
  const handlefusesearch = (e) => {
    setFuseSearch(e.target.value);
    const fuse = new Fuse(sortedsubs, {
      // give keys as titles of each subgreddit
      keys: ["Title"],
    });
    setFuseSorting(fuse.search(e.target.value));
  };
  
  const fusesortingtemp = fusesorting.map((subgreddit) => subgreddit.item);
  console.log(fusesortingtemp, "fusesorting");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <SearchBar handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Fuzzy search
          </Typography>
          <SearchBar handleSearch={handlefusesearch} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* 4 checkboxes in oneline to clicking on which calls 4 different functions */}
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            All Subgreddits
          </Typography>
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={nameascend}
                  onChange={() => {
                    setNameAscend(!nameascend);
                    setNameDescend(false);
                    setDateAscend(false);
                    setFollowersort(false);
                    sortedsubs = sortedsubs.sort((a, b) =>
                      a.Title > b.Title ? 1 : -1
                    );
                    setSelectsortsubs(sortedsubs);
                  }}
                  name="nameascend"
                />
              }
              label="Name Ascending"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={namedescend}
                  onChange={() => {
                    setNameDescend(!namedescend);
                    setNameAscend(false);
                    setDateAscend(false);
                    setFollowersort(false);
                    sortedsubs = sortedsubs.sort((a, b) =>
                      a.Title < b.Title ? 1 : -1
                    );
                    setSelectsortsubs(sortedsubs);
                  }}
                  name="namedescend"
                />
              }
              label="Name Descending"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dateascend}
                  onChange={() => {
                    setDateAscend(!dateascend);
                    setNameAscend(false);
                    setNameDescend(false);
                    setFollowersort(false);
                    sortedsubs = sortedsubs.sort((a, b) =>
                      moment(a.date) > moment(b.date) ? 1 : -1
                    );
                    setSelectsortsubs(sortedsubs);
                  }}
                  name="dateascend"
                />
              }
              label="Date Ascending"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={followersort}
                  onChange={() => {
                    setFollowersort(!followersort);
                    setNameAscend(false);
                    setNameDescend(false);
                    setDateAscend(false);
                    sortedsubs = sortedsubs.sort((a, b) =>
                      a.Members.length < b.Members.length ? 1 : -1
                    );
                    setSelectsortsubs(sortedsubs);
                  }}
                  name="followersort"
                />
              }
              label="Followers"
            />
          </>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Tags handleTag={handleTag} />
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {fusesearch === "" ? (
            <>
              {search === "" ? (
                <>
                  {nameascend || namedescend || dateascend || followersort ? (
                    <CardGrid
                      numColumns={3}
                      cards={selectsortsubs}
                      joined={joinedSubgreddits}
                    />
                  ) : (
                    <CardGrid
                      numColumns={3}
                      cards={sortedsubs}
                      joined={joinedSubgreddits}
                    />
                  )}
                </>
              ) : (
                <CardGrid
                  numColumns={3}
                  cards={filteredSubgredditsbysearch}
                  joined={joinedSubgreddits}
                />
              )}
            </>
          ) : (
            <CardGrid
              numColumns={3}
              cards={fusesortingtemp}
              joined={joinedSubgreddits}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Allsubgreddits;
