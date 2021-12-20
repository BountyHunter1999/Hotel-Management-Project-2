import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function FilterFoods() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory(); // access to that history props now

  const redirectPaths = ["/foods", "/rooms"];

  const submitHandler = (e) => {
    e.preventDefault();

    let pathVar = history.location.pathname.substring(0, 6);
    console.log("WE ARE IN PATH:", pathVar);
    if (keyword) {
      // if(redirectPaths.includes(String(pathVar))){
      if (redirectPaths.includes(pathVar)) {
        history.push(`${pathVar}/?keyword=${keyword}&page=1`);
      }
    } else {
      console.log("else part in searchbox", history.location.pathname);
      history.push(`${history.location.pathname}`);
    }
  };
  console.log("THE KEYWORD IS:", keyword);

  return (
    <div style={{ alignitems: "flex-end" }}>
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Quick Food Filters
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/#/foods/?keyword=veg&page=1">VEG</Dropdown.Item>
          <Dropdown.Item href="/#/foods/?keyword=chicken&page=1">
            CHICKEN
          </Dropdown.Item>
          <Dropdown.Item href="/#/foods/?keyword=buff&page=1">
            BUFF
          </Dropdown.Item>
          <Dropdown.Item href="/#/foods/?keyword=COFFEE&page=1">
            COFFEE
          </Dropdown.Item>
          <Dropdown.Item href="/#/foods/?keyword=tea&page=1">TEA</Dropdown.Item>
          <Dropdown.Item href="/#/foods/?keyword=wine&page=1">
            WINE
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FilterFoods;
