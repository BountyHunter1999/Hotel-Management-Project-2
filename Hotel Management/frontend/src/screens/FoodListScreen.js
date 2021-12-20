import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listFoods, deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function FoodListScreen({ history, match }) {
  const dispatch = useDispatch();

  const foodList = useSelector(state => state.foodList)
  const { loading, error, foods, page, pages } = foodList;

  const productDelete = useSelector(state => state.productDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;

  const productCreate = useSelector(state => state.productCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  let keyword = history.location.search
  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})
    if (!userInfo.isAdmin) {
      history.push("/login");
    } 

    if(successCreate){
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else{
      dispatch(listFoods(keyword))
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
        dispatch(deleteProduct(id))
    }
    console.log("EW");
  };
  const createProductHandler = () => {
    dispatch(createProduct(false))
  }

  return (
    <div>
        <Row className='align-items-center'>
            <Col md={10}>
                <h1>Foods</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Food
                </Button>
            </Col>
        </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>{food._id}</td>
                <td>{food.name}</td>
                <td>Rs.{food.price}</td>
                <td>{food.category}</td>
                <td>{food.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${food._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(food._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={pages} page={page} isAdmin={true}/>
        </div>
      )}
    </div>
  );
}

export default FoodListScreen;
