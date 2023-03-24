import React, { useState } from "react";
import { Col, Row, Card } from "reactstrap";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function ItemCard(props) {
  const [saved, setSaved] = useState(props.isLiked);

  function handleSave() {
    let user = (localStorage.getItem('userEmail'))

    if (saved) {///write delete if saved write post
      axios.delete("/favitem?userId=" + user + "&itemId=" + props.id, {
        saved,
      }).then((res) => {
        setSaved(false)
      }); //after then cal axios .post pass parameter of item id in function and userid as body user id will be local storage later 

    }
    else {
      //post call
      axios.post("/favitem",
        {
          "userId": user,
          "fitemId": [props.id]
        }).then((res) => {
          console.log(res);
          setSaved(true)

        })
        .catch(err => console.log(err))
    }
  }
  return (
    <>
      <Card body className="item-card">
        <Row>
          <Col>
            <img className="item-img" src={`/photos/${props.filename}`} />
          </Col>
          <Col>
            <p>
              <span className="icon">${props.price}</span>{" "}
              <span>
                <FontAwesomeIcon
                  style={{ color: saved ? "red" : "black" }}
                  icon={faHeart}
                  onClick={() => handleSave(props.itemId)}
                  size="2x"
                />
              </span>
            </p>
            <p>{props.name}</p>
            <p>Condition: {props.condition}</p>
            <p>Ph: {props.ph}</p>
            <p>Address: {props.address}</p>
            <p>Posted by: {props.email}</p>
          </Col>
        </Row>
      </Card>
    </>
  );
}
