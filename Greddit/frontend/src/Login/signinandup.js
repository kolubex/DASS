import SignIn from "./signin";
import SignUp from "./signup";
import { useState } from "react";
import "../App.js";


function Handleinandup(props) {
  const [isSignIn, setIsSignIn] = useState(true);

  return isSignIn ? (
    <div>
      <SignIn />
      <button onClick={() => setIsSignIn(false)}>
        Have an Account - Signin
      </button>
    </div>
  ) : (
    <div>
      <SignUp />
      <button onClick={() => setIsSignIn(true)}>
        Have an Account - Signin
      </button>
    </div>
  );
}

export default Handleinandup;