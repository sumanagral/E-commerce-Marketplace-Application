import React, { useState } from "react";
import "../public/styles/favorites.css";
import { Card, Row, Col,Spinner } from "reactstrap";
import { Navbar, NavbarBrand, Modal } from "reactstrap";
import axios from "axios";
import { useEffect } from "react";
import { useMemo } from "react";

//TODO: use useEffect and axios.get("/favorites") to get list of item ids that the buyer has liked

export default function Favorites() {
  const [favItems, setFavItems] = useState();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //
  useEffect(() => {
    getItems()
   // getFavItems() 
    
  },[]);//done today

  const getItems = () =>{
    let user = (localStorage.getItem('userEmail'))
    let data;
    setLoading(true)
    axios
      .get("/item")
      .then((res) => {
        data = res.data;
        axios
          .get("/favitem", { params: { userId: user } })
          .then((res) => {
            let currData = res.data;
            let fav = [];
            currData.map((f) => {
              fav.push(...f.fitemId);
            });
            let finalItemList = [];
            fav.map((fitem) => {
              let f = data.filter((i) => i.itemId === fitem);
              if (f.length > 0) {
                finalItemList.push(...f);
              }
            });

            setFavItems(finalItemList);
            setLoading(false)
            //favitem axios for get //how to pass body and pass uusernamein body in axios
          })

          .catch((err) => console.log(err));
      })
      .catch((err) => {});
  };

  const getFavs = useMemo(() => {
    return favItems;
  }, [favItems]);

  //
  function createCard(item) {
    console.log(item);
    return (
            <>
        <Col className="fav-row">
          <Card className="fav-card" onClick={toggle}>
            <img
              className="item-img"
              src={`/photos/${item.filename}`}
              // ={item.url}
            />
            <p>${item.price}</p>
            <p>{item.name}</p>
          </Card>
        </Col>
        <Modal isOpen={modal} toggle={toggle}>
          <Card body className="favitem-card">
            <Row>
              <Col>
                <img
                  className="item-img"
                  src={`/photos/${item.filename}`}
                  // ={item.url}
                />
              </Col>
              <Col>
                <p>${item.price}</p>
                <p>{item.name}</p>
                <p>Condition: {item.condition}</p>
                <p>Ph: {item.ph}</p>
                <p>Address: {item.address}</p>
                <p>Posted by: {item.email}</p>
              </Col>
            </Row>
          </Card>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">ESP Marketplace</NavbarBrand>
      </Navbar>
      <h2 style={{ textAlign: "center", margin: "20px" }}>Your favorites!</h2>
      {loading ?
      
      <div className="loading">
        <Spinner animation="border" role="status"/>
        <span>Loading...</span>
      </div>

    :
      <Row xs="4">{favItems ? favItems.map(createCard) : null}</Row>
    }
    </>
  );
}
