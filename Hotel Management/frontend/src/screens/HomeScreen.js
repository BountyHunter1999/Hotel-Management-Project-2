import React from "react";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

import { Card } from "react-bootstrap";
// import Product from "../components/Product";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { listProducts } from "../actions/productActions";
// import
import ProductCarousel from "../components/ProductCarousel";
import HomePageCarousel from "../components/HomePageCarousel";

function HomeScreen({ history, location }) {
  let keyword = history.location.search;
  console.log(location.pathname)

  return (
    <div>
      {/* {!keyword && <HomePageCarousel/>} */}
      <HomePageCarousel/>
      <Card style={{ textAlign: "center", border: "none", boxShadow: "none" }} variant="flush" text="dark" flush>

        <Card.Body>
          <Card.Header
            as="h1"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
              border: "none",
            }}
          >
            About us:
          </Card.Header>
          <Card.Text
            style={{
              text: 'bold',
              backgroundColor: 'dark',
              textShadow:" .05px 0.2px",
            }}
          >
            Retreat to Ahjin Hotel, our contemporary hotel in the majestic city
            of Pokhara, Nepal. Set in the vibrant city center near shopping,
            dining and attractions, our hotel offers modern design, 3-star
            service and deluxe amenities. Settle into spacious, well-appointed
            rooms with complimentary Wi-Fi - many with views of the Himalayan
            Mountain range. Dine in our hotel restaurants, featuring National
            and International cuisine. Those planning a trip in Pokhara, Nepal,
            will appreciate our 2,105 square feet of modern decor space,
            complemented by superb food and planning services. Get pampered with
            the hotel services. Explore Bahari Temple, Damside, Davis falls,
            Gupteswor cave and World Peace Pagoda nearby. Look forward to a
            rewarding stay in Nepal at Ahjin Hotel.
          </Card.Text>
        </Card.Body>

      </Card>
    </div>
  );
}

export default HomeScreen;
