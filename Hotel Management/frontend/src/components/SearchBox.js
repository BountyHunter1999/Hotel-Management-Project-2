import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

// yo component ma history lai yettikai destructure gara ra use garna mildena so useHistory
function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory(); // access to that history props now
  let location = useLocation(); // access to that location props now

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
  console.log("location is in search bar", location);

  return (
    //     <Form className="d-flex" onSubmit={submitHandler} inline>
    //     <Form.Control
    //       type="search"
    //       placeholder="Search"
    //       className="mr-2"
    //       aria-label="Search"
    //     />
    //     <Button variant="outline-success">Search</Button>
    //   </Form>

    location.pathname !== "/" && (
      <Form className="d-flex" onSubmit={submitHandler} inline={true}>
        <Form.Control
          type="search"
          name="q"
          place
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
          style={{ paddingRight: "2px" }}
        ></Form.Control>

        <Button type="submit" variant="outline-success" inline className="p-2">
          Search
        </Button>
      </Form>
    )
  );
}

export default SearchBox;
