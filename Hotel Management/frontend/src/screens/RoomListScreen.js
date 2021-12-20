import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listRooms } from "../actions/roomActions";
import { deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function RoomListScreen({ history, match }) {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.roomList);
  const { loading, error, rooms } = roomList;

  
  const productDelete = useSelector(state => state.productDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;

  
  const productCreate = useSelector(state => state.productCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})
    if (!userInfo.isAdmin) {
      history.push("/login");
    } 

    if(successCreate){
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else{
      dispatch(listRooms())
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this room type?")) {
      dispatch(deleteProduct(id));
    }
    console.log("EW");
  };
  const createProductHandler = () => {
    dispatch(createProduct(true))
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col md={10}>
          <h1>Rooms</h1>
        </Col>
        <Col className="text-right w-100">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Room
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
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room._id}</td>
                <td>{room.name}</td>
                <td>Rs.{room.price}</td>
                <td>{room.category}</td>
                <td>{room.countInStock}</td>
                <td>
                  <LinkContainer to={`/admin/product/${room._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(room._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default RoomListScreen;
