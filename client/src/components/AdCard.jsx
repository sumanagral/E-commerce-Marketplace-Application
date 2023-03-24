import React from "react";
import { Col, Row, Card } from "reactstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import whatsappShare from "../assets/whatsapp.jpeg";

export default function ItemCard(props) {
  function handleDelete() {
    axios.delete("/item/" + props.id).then(() => {
      window.location.reload();
    });
  }

  return (
      <>
        <Card body className="item-card">
          <Row>
            <Col>
              <img className="item-img" src={`/photos/${props.filename}`} />
            </Col>
            <Col>
              <span className="icon">${props.price}</span>
              <p>{props.name}</p>
              <p>Condition: {props.condition}</p>
              <p>Ph: {props.ph}</p>
              <p>Address: {props.address}</p>
              <p>Posted by: {props.email}</p>
            </Col>
            <Col>
              <Row>
              <span>
                <FontAwesomeIcon
                    style={{ color: "black" }}
                    icon={faTrash}
                    onClick={() => handleDelete(props.email)}
                    size="2x"
                />
              </span>
              </Row>
              <Row>
              <span>
                <a
                    href={`https://wa.me/?text=The item is for sale %0a ${
                        props.name
                    }%0a Price:$${props.price}%0a ${encodeURIComponent(
                        window.location.origin + "/photos/" + props.filename
                    )}`}
                    data-action="share/whatsapp/share"
                    target="_blank"
                    rel="noreferrer"
                >
                  <img
                      src={whatsappShare}
                      alt="whatsapp share"
                      style={{ width: "32px", height: "32px", padding: "4px" }}
                  />
                </a>
              </span>
              </Row>
            </Col>
          </Row>
        </Card>
      </>
  );
}
