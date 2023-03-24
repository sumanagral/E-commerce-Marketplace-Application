import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  Navbar,
  Alert,
  NavbarBrand,
} from "reactstrap";

import "../public/styles/sellerPage.css";
import Login from "./Login";

export default function SellerPage() {
  const [posted, setPosted] = useState(false);
  const fileRef = useRef(null);
  const [ad, setAd] = useState({
    price: "",
    name: "",
    condition: "",
    ph: "",
    address: "",
    filename: "",
    email: localStorage.getItem("userEmail"),
  });

  function handleChange(e) {
    let { name, value } = e.target;
    setAd((prev) => {
      if (name != "file") {
        return {
          ...prev,
          [name]: value,
        };
      } else {
        return {
          ...prev,
          file: Array.from(e.target.files)[0],
          filename: Array.from(e.target.files)[0].name,
        };
      }
    });
  }

  function postAd(e) {
    axios
      .post(
        "/item/saveImage",
        { file: ad.file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("image saved");
        delete ad["file"];
        axios
          .post("/item", {
            ad,
          })
          .then((res) => {
            console.log(res);
            setPosted(true);
            fileRef.current.files = null;
            setAd({
              price: "",
              name: "",
              condition: "",
              ph: "",
              address: "",
              filename: "",
              email: localStorage.getItem("userEmail")
            });
          });
      });
    e.preventDefault();
  }

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <span className="brandname">ESP Marketplace</span>
          <span><a href="/ads">ads</a></span>
          &nbsp;&nbsp;
          <Login />
        </NavbarBrand>
      </Navbar>
      <h2 style={{ textAlign: "center", margin: "20px" }}>
        Post an ad for your product!
      </h2>
      <div>
        <Card className="post-ad-card">
          <Form onSubmit={postAd}>
            <FormGroup floating>
              <Input
                name="price"
                type="number"
                onChange={handleChange}
                value={ad.price}
                required
              />
              <Label for="price">Price</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                name="name"
                type="text"
                onChange={handleChange}
                value={ad.name}
                required
              />
              <Label for="name">Name</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                name="condition"
                type="text"
                onChange={handleChange}
                value={ad.condition}
                required
              />
              <Label for="condition">Condition</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                name="ph"
                type="number"
                onChange={handleChange}
                value={ad.ph}
                required
              />
              <Label for="ph">Contact</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                name="address"
                type="text"
                onChange={handleChange}
                value={ad.address}
                required
              />
              <Label for="address">Address</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                name="file"
                type="file"
                id="multi"
                onChange={handleChange}
                ref={fileRef}
                required
              />
              <Label for="image">Upload image</Label>
            </FormGroup>{" "}
            <Button className="postBtn">Post</Button>
          </Form>
          <br></br>
          {posted ? <Alert color="info">You're ad has been posted!</Alert> : ""}
        </Card>
      </div>
    </>
  );
}
