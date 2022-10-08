const initialState = {
  userLogin: {
    token: null,
    isLogin: false,
    role: null,
    userId: null,
    name: null,
    ds_sn: null,
  },
  result: {
    status: null,
    message: null,
  },
  userDetail: null,
  userPerm: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          token: action.result.token,
          role: action.result.result[0].CODE,
          name: action.result.result[0].NAME,
          ds_sn: action.result.result[0].DS_SN,
          userId: action.result.result[0].USER_ID,
          isLogin: action.result.success,
        },
        result: {
          ...state.result,
          status: "success",
          message: "Нэвтрэх нэр, нууц үг амжилттай баталгаажлаа.",
        },
      };

    case "LOGIN_USER_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "CLEAR_USER_SUCCESS":
      return initialState;

    case "GET_USER_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_USER_SUCCESS":
      return {
        ...state,
        userDetail: action.result,
      };

    case "GET_USER_ERROR":
      return {
        ...state,
      };

    case "CHANGE_PASSWORD_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        result: {
          ...state.result,
          status: "success",
          message: "Нууц үг амжилттай өөрчлөгдлөө.",
        },
      };

    case "CHANGE_PASSWORD_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Нууц өөрчлөхөд алдаа гарлаа.",
        },
      };

    case "GET_PERMISSION_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_PERMISSION_SUCCESS":
      return {
        ...state,
        userPerm: action.result,
      };

    case "GET_PERMISSION_ERROR":
      return {
        ...state,
      };

    case "CREATE_PERMISSION_START":
      return {
        ...state,
        loading: true,
      };

    case "CREATE_PERMISSION_SUCCESS":
      return {
        ...state,
        loading: false,
        result: {
          ...state.result,
          status: "success",
          message: "Эрхийг амжилттай олголоо.",
        },
      };

    case "CREATE_PERMISSION_ERROR":
      return {
        ...state,
        loading: false,
        result: {
          ...state.result,
          status: "error",
          message: "Эрх олгоход алдаа гарлаа.",
        },
      };

    default:
      return state;
  }
};

export default UserReducer;
