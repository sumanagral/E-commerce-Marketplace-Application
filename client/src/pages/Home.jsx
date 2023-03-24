import React from "react";
import "../public/styles/login.css";
import {
  Card,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import Profile from "../components/Profile";
import Login from "./Login"

const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Home() {
  return (
    <>
      {" "}
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">ESP Marketplace</NavbarBrand>
        <Login />
      </Navbar>
      <div style={cardStyle}>
        <Card className="login-form">
          <h3 style={{ textAlign: "center" }}>Choose your account type</h3>
          <br />
          <Profile />
          <br />
          <p style={{  textAlign: "center"}}>
        Donate to our small business! Click{" "}
        <a href="https://apis.127-0-0-1.sslip.io/payment" style={{ color: "#70AACB"}}>
          here
        </a>{" "}
      </p>

        </Card>
      </div>
      
    </>
  );
}
