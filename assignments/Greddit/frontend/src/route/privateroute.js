import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignIn from "../Login/signin";

const checkuser = async () => {
  const token = localStorage.getItem("token");
  // appending token to header s of the request
  let result = false;
  if (token) {
    try {
      const details = {
        id: token,
      };
      const res = await axios.post(
        "/api/verifysignin",
        details
      );
      if (res.data === "true") {
        result = true;
      }
    } catch (e) {
      console.log(e);
      result = false;
    }
  } else {
    result = false;
  }
  console.log(result);
  return result;
};

const Privateroute = ({ children }) => {
  const navigate = useNavigate();
  if (checkuser()) {
    localStorage.setItem("logincheck", "true");
  } else {
    localStorage.setItem("logincheck", "false");
  }
  return checkuser() ? children : <navigate to="/" />;
};

export default Privateroute;
