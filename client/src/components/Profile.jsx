import React, { useState } from "react";
import { Card, Col, Row, Label } from "reactstrap";
import buyerImg from "../public/images/Buyer.png";
import sellerImg from "../public/images/Seller.png";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const [isActive, setIsActive] = useState({
    buyer: false,
    seller: false,
  });
  const profileStyle = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  };

  const navigate = useNavigate();

  return (
    <div>
      <Row>
        <Col
          id="buyer"
          style={profileStyle}
          onClick={() => {
            window.location.replace("/buyer");
          }}
        >
          <Card
            className="buyer-profile"
            style={{
              boxShadow: isActive.buyer ? "inset 0 0 0 4px #DAEAF4" : "",
            }}
          >
            <img
              width="150px"
              src={buyerImg}
              style={{ margin: "10px" }}
              alt=""
            />
            Buyer
          </Card>
        </Col>
        <Col
          id="seller"
          style={profileStyle}
         onClick={() => {
          window.location.replace("/seller");
          }}
        >
          <Card
            className="seller-profile"
            style={{
              boxShadow: isActive.seller ? "inset 0 0 0 4px #DAEAF4" : "",
            }}
          >
            <img
              width="150px"
              src={sellerImg}
              style={{ margin: "10px" }}
              alt=""
            />
            Seller
          </Card>
        </Col>
      </Row>
    </div>
  );
}
