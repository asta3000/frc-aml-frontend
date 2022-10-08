import axios from "../../axios";

export const getModules = (id = 1) => {
  return function (dispatch) {
    dispatch(getModulesStart());

    axios
      .get("modules/" + id)
      .then((result) => {
        dispatch(getModulesSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getModulesError());
      });
  };
};

export const getModulesStart = () => {
  return {
    type: "GET_MODULES_START",
  };
};

export const getModulesSuccess = (result) => {
  return {
    type: "GET_MODULES_SUCCESS",
    result,
  };
};

export const getModulesError = () => {
  return {
    type: "GET_MODULES_ERROR",
  };
};
