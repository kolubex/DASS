import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Signin from "../Login/signin.js";
import Profile from "../profile/profile.js";
import Mysubgreddits from "../Mysubgreddit/MySubgreddit.js";
import Allsubgreddits from "../Allsubgreddits/allsubgreddits.js";
import SavedPosts from "../savedposts/saved.js";
import ResponsiveAppBar from "../Navigation/Navigation.js";
import BottomTabs from "../Mysubgreddit/Subpages/Navbar.js";
import ExampleUI from "../Allsubgreddits/opensubgreddit.js";
export default function Routing() {
  // React.useEffect()
  return (
    <BrowserRouter>
      <div>
        {localStorage.getItem("logincheck") === "true" ? (
          <>
            <ResponsiveAppBar />
            <Routes>
              <Route exact path="/" element={<Profile/>} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/mysubgreddits" element={<Mysubgreddits />} />
              <Route exact path="/mysubgreddits/:id" element={<BottomTabs />} />
              <Route exact path="/allsubgreddits" element={<Allsubgreddits />} />
              <Route exact path="/allsubgreddits/:id" element={<ExampleUI />} />
              <Route exact path="/savedposts" element={<SavedPosts />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Signin />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}
