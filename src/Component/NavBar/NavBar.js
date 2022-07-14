import React from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav, Container } from "react-bootstrap";

import "./NavBar.module.scss";
import "./Navbar.css";
export default function NavBar() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="flex-column flex-grow-1"
        style={{ backgroundColor: "#050505" }}
      >
        <Container className="d-flex" style={{ lineHeight: "2.2" }}>
          <Navbar.Brand
            className="text-light fw-bold flex-grow-1 ms-5"
            href="#home"
          >
            ToolSeo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="flex-grow-0 line-height-nav"
            id="responsive-navbar-nav"
          >
            <Nav className="nav-color">
              {/* <i className="text-light  fs-3 lh-1" size="lg">
                {<FaFacebook />}
              </i> */}
              <img
                src="https://img.icons8.com/color/48/000000/facebook-new.png"
                alt="logo-facebook"
              />
              <a
                className="fw-bold color-decor ms-1"
                href="https://www.facebook.com/itphamky"
              >
                Facebook hỗ trợ
              </a>

              <img
                src="https://img.icons8.com/color/48/000000/zalo.png"
                className="ms-3"
                alt="logo-za"
              />
              <a
                className="fw-bold color-decor ms-1 me-3"
                href="https://www.facebook.com/itphamky"
              >
                Zalo hỗ trợ
              </a>
              {/* <i className="text-light  ms-4 fs-4 lh-1" size="lg">
                {<BsPersonCircle />}
              </i> */}

              <img
                src="https://img.icons8.com/external-flaticons-flat-flat-icons/48/000000/external-user-web-flaticons-flat-flat-icons-2.png"
                alt="logo-user"
              />
              <Link className="fw-bold color-decor ms-1" to="/search-result">
                Thông tin cá nhân
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
