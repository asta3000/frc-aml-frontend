import axios from "../../axios";

export const getMenus = (id = null) => {
  return function (dispatch) {
    dispatch(getMenusStart());
    axios
      .get("menus/" + id)
      .then((result) => {
        dispatch(getMenusSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getMenusError());
      });
  };
};

export const getMenusStart = () => {
  return {
    type: "GET_MENUS_START",
  };
};

export const getMenusSuccess = (result) => {
  return {
    type: "GET_MENUS_SUCCESS",
    result,
  };
};

export const getMenusError = () => {
  return {
    type: "GET_MENUS_ERROR",
  };
};
