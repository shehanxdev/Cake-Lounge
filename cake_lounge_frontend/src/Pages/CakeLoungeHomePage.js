import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CakeLoungeHeader.css";
//Material UI imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Paper from "@mui/material/Paper";
import SellIcon from "@mui/icons-material/Sell";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import { Avatar, Card, Divider, Link } from "@mui/material";

//Assests Import
import PropPic from "../Assets/user.png";
import NederlandFlag from "../Assets/netherlands.png";

export default function CakeLoungeHomePage(props) {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/fetch/shops")
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.log("[Cake Lounge Frontend ]", error);
      });
  });
  //conditional rendering
  if (products == null) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="d-flex  flex-column">
        <header className="d-flex flex-column">
          <div className=" text-white bg-dark container-fluid custom-above-navbar-section ">
            <div className=" d-flex container-1">
              <span>
                Hello, <b>Name</b>
              </span>
              <span className="mx-2">Daily Deals</span>
              <span className="mx-2">Help Center</span>
            </div>
            <div className="d-flex container-2">
              <div className="d-flex">
                <ExpandMoreIcon />
                <span>EUR</span>
              </div>
              <div className="d-flex">
                <span className="mx-2">Ship to</span>
                <img className="mt-1" src={NederlandFlag} alt="" />
              </div>
              <div className="d-flex">
                <span className="mx-2">Sell</span>
                <span className="mx-2">Wishlist</span>
              </div>
              <div className="d-flex">
                <NotificationsIcon
                  className="mt-1 mx-1"
                  sx={{ fontSize: 17 }}
                />
                <ShoppingCartIcon className="mt-1 mx-1" sx={{ fontSize: 17 }} />
              </div>
            </div>
          </div>
          <nav className="container-fluid custom-navbar p-2 shadow d-flex justify-content-around px-3">
            <h1 className="col-md-3">Cake Lounge</h1>
            <div className="d-flex col-md-6">
              <Paper
                className="custom-border"
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Cakes"
                  inputProps={{ "aria-label": "search cakes" }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Link>Advanced Search</Link>
            </div>
            <div className="d-flex col-md-3 justify-content-end">
              <ShoppingCartIcon
                className="mx-2"
                sx={{ alignSelf: "center", fontSize: 30 }}
              />
              <NotificationsIcon
                className="mx-2"
                sx={{ alignSelf: "center", fontSize: 30 }}
              />
              <SellIcon
                className="mx-2"
                sx={{ alignSelf: "center", fontSize: 30 }}
              />
              <Avatar
                className="custom-border custom-navbar-user-image mx-2"
                src={PropPic}
              />
            </div>
          </nav>
        </header>
        <section className="custom-home-page-product-list d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[0].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[0].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[0].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[0].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[1].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[1].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[1].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[1].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[2].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[2].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[2].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[2].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[3].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[3].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[3].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[3].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
          </div>
          <div className="d-flex justify-content-center">
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[1].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[1].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[1].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[1].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[0].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[0].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[0].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[0].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[3].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[3].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[3].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[3].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[2].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[2].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[2].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[2].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
          </div>
        </section>
        <footer className="custom-home-footer d-flex bg-dark text-white p-5 justify-content-around mt-5">
          <div className="d-flex flex-column col-md-3">
            <h3 className="h3">General Links</h3>
            <span>About</span>
            <span>Contact</span>
            <span>Help Center</span>
            <span>Site map</span>
          </div>
          <div className="d-flex flex-column col-md-3">
            <h3 className="h3">Buyer</h3>
            <span>Registration</span>
            <span>Buyer Help Center</span>
            <span>Shops</span>
          </div>
          <div className="d-flex flex-column col-md-3">
            <h3 className="h3">Seller</h3>
            <span>Registration</span>
            <span>Seller Help Center</span>
            <span>My Shops</span>
            <span>Seller Policy</span>
          </div>
          <div className="d-flex flex-column">
            <h3 className="h3">Reach Us</h3>
            <div className="d-flex">
              <FacebookIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <InstagramIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <YouTubeIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <TwitterIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
            </div>
            <h3 className="h3 mt-4">Our Apps</h3>
            <div className="d-flex">
              <AndroidIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <AppleIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
