import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;
  //   console.log("history is", history);
  //   console.log("match is", match);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [imageII, setImageII] = useState("");
  const [imageIII, setImageIII] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0); // for room only
  const [max_food_count, setMaxFoodCount] = useState(0); // for food only
  const [uploading, setUploading] = useState(false);
  const [uploadingII, setUploadingII] = useState(false);
  const [uploadingIII, setUploadingIII] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      if (product.isRoom) {
        history.push("/admin/roomList");
      } else {
        history.push("/admin/foodList");
      }
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        if (product.isRoom) {
          setCountInStock(product.countInStock);
        } else {
          setMaxFoodCount(product.max_food_count);
        }
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (product.isRoom) {
      console.log("IS ROOM DISPATCHED");
      console.log("image", image);
      console.log("imageII", imageII);
      console.log("imageIII", imageIII);
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          imageII,
          imageIII,
          category,
          countInStock,
          max_food_count,
          description,
          isRoom: product.isRoom,
        })
      );
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          countInStock,
          max_food_count,
          description,
          isRoom: product.isRoom,
        })
      );
    }
    console.log("UPDATE PRODUCT");
  };

  const uploadFileHandler = async (e) => {
    // console.log("EVENT IS", e)
    const file = e.target.files[0];
    const formData = new FormData();

    console.log(file)
    formData.append("image", file);
    // if (product.isRoom) {
    //   formData.append("imageII", file);
    //   formData.append("imageIII", file);
    // }
    formData.append("product_id", productId);
    console.log("FORM DATA IS:", formData);

    setUploading(true);

    // we can't send a typical post request and expect to get our file (FILES ma)
    try {
      const config = {
        headers: {
          // this allows us to get the FILES from here
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      console.log("data is", data);
      setImage(data); // data is the image path here
      // setImageII(imageII);
      // setImageIII(imageIII);
      setUploading(false);
      console.log("IMAGE 1 is uploaded");
    } catch (error) {
      console.log("FAILED TO LOAD THE IMAGE");
      setUploading(false);
    }
  };

  const uploadFileHandlerII = async (e) => {
    // console.log("EVENT IS", e)
    const file = e.target.files[0];
    const formData = new FormData();


      formData.append("imageII", file);
      // formData.append("imageIII", file);
  
    formData.append("product_id", productId);
    console.log("FORM DATA 2 IS:", formData);

    setUploadingII(true);

    // we can't send a typical post request and expect to get our file (FILES ma)
    try {
      const config = {
        headers: {
          // this allows us to get the FILES from here
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/products/upload2/",
        formData,
        config
      );

      console.log("data is", data);
      // setImage(image); // data is the image path here
      setImageII(data);
      // setImageIII(imageIII);
      setUploadingII(false);
      console.log("IMAGE 2 is uploaded");
    } catch (error) {
      console.log("FAILED TO LOAD THE IMAGE");
      setUploadingII(false);
    }
  };

  const uploadFileHandlerIII = async (e) => {
    // console.log("EVENT IS", e)
    const file = e.target.files[0];
    const formData = new FormData();

    // formData.append("image", file);
    // if (product.isRoom) {
    //   formData.append("imageII", file);
      formData.append("imageIII", file);
    // }
    formData.append("product_id", productId);
    console.log("FORM DATA 3  IS:", formData);

    setUploadingIII(true);

    // we can't send a typical post request and expect to get our file (FILES ma)
    try {
      const config = {
        headers: {
          // this allows us to get the FILES from here
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/products/upload3/",
        formData,
        config
      );

      console.log("data is", data);
      // setImage(image); // data is the image path here
      // setImageII(imageII);
      setImageIII(data);
      setUploadingIII(false);
      console.log("IMAGE 3 is uploaded");
    } catch (error) {
      console.log("FAILED TO LOAD THE IMAGE");
      setUploadingIII(false);
    }
  };

  return (
    <div>
      {/* yo talako link check gara ra rakhna  */}
      {/* <Link to="/admin/foodlist" className="btn btn-light my-3">
        Go Back
      </Link> */}
      <Button style={{ marginBottom: "9px"}}  onClick={() => history.goBack()}>Go Back</Button>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                id="image-file"
                // label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {product.isRoom && (
              <div>
                <Form.Group controlId="imageII">
                  <Form.Label>View 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Image"
                    value={imageII}
                    onChange={(e) => setImageII(e.target.value)}
                  ></Form.Control>

                  <Form.File
                    id="image-fileII"
                    // label="Choose File"
                    custom
                    onChange={uploadFileHandlerII}
                  ></Form.File>
                  {uploadingII && <Loader />}
                </Form.Group>

                <Form.Group controlId="imageIII">
                  <Form.Label>Bathroom View</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Image"
                    value={imageIII}
                    onChange={(e) => setImageIII(e.target.value)}
                  ></Form.Control>

                  <Form.File
                    id="image-fileIII"
                    // label="Choose File"
                    custom
                    onChange={uploadFileHandlerIII}
                  ></Form.File>
                  {uploadingIII && <Loader />}
                </Form.Group>
              </div>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {product.isRoom ? (
              <Form.Group controlId="countinstock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter No. Of Rooms"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
            ) : (
              <Form.Group controlId="maxfoodcount">
                <Form.Label>Max Food Count</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Max Food Quantity"
                  value={max_food_count}
                  onChange={(e) => setMaxFoodCount(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Give Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
