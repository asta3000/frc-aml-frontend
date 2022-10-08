const initialState = {
  modules: [],
  loading: false,
  result: {
    status: null,
    message: null,
  },
};

const ModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MODULES_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_MODULES_SUCCESS":
      return {
        ...state,
        modules: action.result.result,
        result: {
          ...state.result,
          status: "success",
          message: "Модулиудыг татаж дууслаа.",
        },
      };

    case "GET_MODULES_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Модулиудыг дуудахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    default:
      return state;
  }
};

export default ModuleReducer;
