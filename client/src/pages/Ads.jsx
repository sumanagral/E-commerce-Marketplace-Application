import axios from "axios";
import React, { useState } from "react";
import Search from "../components/Search";
import "../public/styles/buyerPage.css";
import { Navbar, NavbarBrand } from "reactstrap";
import AdCard from "../components/AdCard";
import { useEffect } from "react";
import Login from "./Login";

export default function BuyerPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("/item?userId=" + localStorage.getItem("userEmail"))
      .then((res) => {
        let data = res.data;
        setItems(data);
      })
      .catch((err) => {});
  }, []);

  function create(item) {
    return (
      <AdCard
        ads={true}
        key={item.itemId}
        id={item.itemId}
        price={item.price}
        name={item.name}
        condition={item.condition}
        filename={item.filename}
        ph={item.ph}
        address={item.address}
        email={localStorage.getItem("userEmail")}
      />
    );
  }
  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <span className="brandname">ESP Marketplace</span>
          <span>
            <a href="/seller">post ad</a>
            &nbsp;&nbsp;
            <Login />
          </span>
        </NavbarBrand>
      </Navbar>
      <Search />
      {items.map(create)}
    </>
  );
}
