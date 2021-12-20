import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import FilterFoods from "../components/FilterFoods";
import ProductCarousel from '../components/ProductCarousel'
// import FilterFoods from "../components/FilterFoods";
import { listFoods } from "../actions/productActions";

function FoodsScreen({ history }) {
  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.foodList);
  const { error, loading, foods, page, pages } = foodList;

  let keyword = history.location.search
  console.log("Keyword in foodsscreen", keyword)

  useEffect(() => {
    dispatch(listFoods(keyword));
  }, [dispatch , keyword]);

  return (
    <div>
      <FilterFoods />
      <h1>Available Foods</h1>
      {/* <FilterFoods /> */}
       {!keyword && <ProductCarousel /> } 
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
          <div>
        <Row>
          {foods.map((food) => (
            <Col key={food._id} sm={12} ms={6} lg={4} xl={3}>
              <Product product={food} />
            </Col>
          ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword}/>
        </div>
      )}
    </div>
  );
}

export default FoodsScreen;

