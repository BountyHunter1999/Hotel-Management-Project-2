import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  //
  ROOM_TOP_REQUEST,
  ROOM_TOP_SUCCESS,
  ROOM_TOP_FAIL,
} from "../constants/roomConstants";

export const roomListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { loading: true, rooms: [] };

    case ROOM_LIST_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case ROOM_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const roomTopRatedReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_TOP_REQUEST:
      return { loading: true, rooms: [] };

    case ROOM_TOP_SUCCESS:
      return { loading: false, rooms: action.payload };

    case ROOM_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
