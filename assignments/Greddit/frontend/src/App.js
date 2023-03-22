// import ResponsiveAppBar from "./Navigation/Navigation.js";
import React from "react";
import Routing from "./route/router.js";
import {Router} from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "reactstrap";
import MySubgreddit from "./Mysubgreddit/MySubgreddit.js";
import Tags from "./Allsubgreddits/tags.js";
import Allsubgreddits from "./Allsubgreddits/allsubgreddits.js";
import Post from "./Allsubgreddits/post.js";

import Opensub from "./Allsubgreddits/opensubgreddit.js";
import SavedPosts from "./savedposts/saved.js";
import Users from "./Mysubgreddit/Subpages/users.js";
import SubRequests from "./Mysubgreddit/Subpages/requests.js";
import Reports from "./Mysubgreddit/Subpages/reports.js";
import BlockButton from "./test.js";
import UserDetailsDialog from "./profile/editdialog.js";
import Profile from "./profile/profile.js";
import NavBar from "./Mysubgreddit/Subpages/Navbar.js";
// import CommentsDialog from "./test.js";
function App() {
  
  return ( 
    <div>
      <Routing />
      {/* <CommentsDialog/> */}

      {/* <NavBar/> */}
      {/* <Profile /> */}
      {/* <CreateSubGreddit/> */}
      {/* <MySubgreddit /> */}
      {/* <Tags /> */}
      {/* <Allsubgreddits /> */}
      {/* <Post /> */}
      {/* <Opensub 
      title="Example Title"
      description="Example Description"
      posts={42}
      time="2h hours ago"
      bannedWords="Word1, Word2, Word3"
      imageUrl="https://picsum.photos/200"/> */}
      {/* <SavedPosts /> */}
      {/* <Users /> */}
      {/* <SubRequests /> */}
      {/* <Reports /> */}
      {/* <BlockButton /> */}
      {/* <UserDetailsDialog/> */}

    </div>
  );
}

export default App;