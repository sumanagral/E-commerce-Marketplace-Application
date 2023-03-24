import React from "react";
import { faGithubAlt, faJenkins } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOktaAuth } from "@okta/okta-react";
import useAuthUser from "../components/User";
import { Container, Navbar, NavbarBrand, Button } from "reactstrap";

export default function DevPortal() {
  const userInfo = useAuthUser();
  const { oktaAuth, authState } = useOktaAuth();
  const loggingIn = async () =>
    oktaAuth.signInWithRedirect({ originalUri: "/" });
  const loggingOut = async () => oktaAuth.signOut();

  return (
    <Container>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">ESP Marketplace</NavbarBrand>
        {authState?.isAuthenticated ? (
          <Button variant="outline-success" onClick={loggingOut}>
            Logout
          </Button>
        ) : (
          <Button variant="outline-success" onClick={loggingIn}>
            Login
          </Button>
        )}
      </Navbar>
      {authState?.isAuthenticated ? (
        <>
          <h3 style={{ textAlign: "center", margin: "20px" }}>
            Welcome {userInfo?.name}!
          </h3>
          <div
            style={{ textAlign: "center", margin: "10px", marginTop: "20px" }}
          >
            <a
              href="https://github.com/orgs/Pramatha-Nadig/sso"
              style={{ color: "black" }}
            >
              <Button style={{ margin: "20px" }}>
                <FontAwesomeIcon icon={faGithubAlt} size="6x" />
              </Button>
            </a>
            <a href="https://jenkins.127-0-0-1.sslip.io" style={{ color: "black" }}>
              <Button style={{ margin: "20px" }}>
                <FontAwesomeIcon icon={faJenkins} size="6x" />
              </Button>
            </a>
            <a href="https://grafana.127-0-0-1.sslip.io">
              <Button style={{ margin: "20px" }}>
                <img
                  src="https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg"
                  style={{ height: "90px" }}
                  alt=""
                />
              </Button>
            </a>

            <a href="https://prometheus.127-0-0-1.sslip.io">
              <Button style={{ margin: "20px" }}>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/prometheus-282488.png"
                  style={{ height: "90px" }}
                  alt=""
                />
              </Button>
            </a>
            <a href="https://alertmanager.127-0-0-1.sslip.io">
              <Button style={{ margin: "20px" }}>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/prometheus-282488.png"
                  style={{ height: "90px" }}
                  alt=""
                />
                Alert manager
              </Button>
            </a>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "6rem", fontSize: "2rem" }}>
          Please login to proceed
        </p>
      )}
    </Container>
  );
}
