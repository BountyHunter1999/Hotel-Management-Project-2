import axios from "axios";

import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  //
  ROOM_TOP_REQUEST,
  ROOM_TOP_SUCCESS,
  ROOM_TOP_FAIL,
} from "../constants/roomConstants";

export const listRooms = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: ROOM_LIST_REQUEST });
    console.log("INSIDE OF listROoms");
    const { data } = await axios.get(`/api/products/rooms/${keyword}`);
    console.log(data);
    dispatch({
      type: ROOM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listTopRooms = () => async (dispatch) => {
  try {
    dispatch({ type: ROOM_TOP_REQUEST });
    const { data } = await axios.get(`/api/products/topRooms/`);
    
    dispatch({
      type: ROOM_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_TOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
