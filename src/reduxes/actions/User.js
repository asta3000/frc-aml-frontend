import axios from "../../axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

// Хэрэглэгч нэвтрэх
export const LoginUser = (username, password) => {
  return function (dispatch) {
    dispatch(LoginUserStart());

    axios
      .post("login", { login: username, password: password })
      .then((result) => {
        localStorage.setItem("action", "userlogged");
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.result[0].USER_ID);
        localStorage.setItem("role", result.data.result[0].CODE);
        localStorage.setItem("name", result.data.result[0].NAME);
        localStorage.setItem("sector", result.data.result[0].SECTOR);
        localStorage.setItem("sector_desc", result.data.result[0].SECTOR_DESC);
        dispatch(LoginUserSuccess(result.data));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/login хаягнаас өгөгдөл баталгаажууллаа`,
            DATA: { login: username, password: "Нууц мэдээлэл" },
          },
        });
      })
      .catch((error) => {
        dispatch(LoginUserError());
      })
      .finally(() => {
        const action = localStorage.getItem("action");
        action === "userlogged"
          ? toast.success("Сайн байна уу? " + localStorage.getItem("name"), {
              autoClose: 2000,
            })
          : toast.error("Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу!", {
              autoClose: 2000,
            });
        localStorage.removeItem("action");
      });
  };
};

export const LoginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};

export const LoginUserSuccess = () => {
  return {
    type: "LOGIN_USER_SUCCESS",
  };
};

export const LoginUserError = () => {
  return {
    type: "LOGIN_USER_ERROR",
  };
};

// Хэрэглэгчийн мэдээлэл устгах
export const ClearUser = () => {
  return function (dispatch) {
    dispatch(ClearUserSuccess());
  };
};

export const ClearUserSuccess = () => {
  return {
    type: "CLEAR_USER_SUCCESS",
  };
};

// Хэрэглэгчийн мэдээлэл авах
export const GetUser = () => {
  return function (dispatch) {
    dispatch(GetUserStart());

    const userId = localStorage.getItem("userId");

    axios
      .get("frcusers/" + userId)
      .then((result) => {
        if (result.data.result.length > 0) {
          dispatch(GetUserSuccess(result.data.result[0]));
        } else {
          axios
            .get("organizations/" + userId)
            .then((result) => {
              dispatch(GetUserSuccess(result.data.result[0]));
            })
            .then(async () => {
              const res = await axios.get("https://geolocation-db.com/json/");
              axios.post("amllogs", {
                USER_ID: localStorage.getItem("userId"),
                IP_ADDR: res.data.IPv4,
                METHOD: "GET",
                CONTENT: {
                  ACTION: `/organizations/${userId} хаягнаас өгөгдөл авлаа.`,
                },
              });
            })
            .catch((error) => {
              console.log(error);
              dispatch(GetUserError());
            });
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/frcusers/${userId} хаягнаас өгөгдөл авлаа.`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(GetUserError());
      });
  };
};

export const GetUserStart = () => {
  return {
    type: "GET_USER_START",
  };
};

export const GetUserSuccess = (result) => {
  return {
    type: "GET_USER_SUCCESS",
    result,
  };
};

export const GetUserError = () => {
  return {
    type: "GET_USER_ERROR",
  };
};

// Хэрэглэгчийн эрх авах
export const GetPermission = (user_id, api_name) => {
  return function (dispatch) {
    dispatch(GetPermissionStart());

    axios
      .get(api_name + "permission/" + user_id)
      .then((result) => {
        dispatch(GetPermissionSuccess(result.data.result[0]));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/${api_name}/permission/${user_id} хаягнаас өгөгдөл авлаа.`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(GetPermissionError());
      });
  };
};

export const GetPermissionStart = () => {
  return {
    type: "GET_PERMISSION_START",
  };
};

export const GetPermissionSuccess = (result) => {
  return {
    type: "GET_PERMISSION_SUCCESS",
    result,
  };
};

export const GetPermissionError = () => {
  return {
    type: "GET_PERMISSION_ERROR",
  };
};

// Нууц үг солих
export const ChangePassword = (content, userId) => {
  return function (dispatch) {
    dispatch(ChangePasswordStart());

    if (content.newpass === content.confirmpass) {
      axios
        .put("frcusers/changepassword/" + userId, content)
        .then((result) => {
          localStorage.setItem("action", "passwordchanged");
          dispatch(ChangePasswordSuccess(result.data.result));
        })
        .then(async () => {
          const res = await axios.get("https://geolocation-db.com/json/");
          axios.post("amllogs", {
            USER_ID: localStorage.getItem("userId"),
            IP_ADDR: res.data.IPv4,
            METHOD: "PUT",
            CONTENT: {
              ACTION: `/frcusers/changepassword/${userId} хаяг руу өгөгдөл өөрчиллөө.`,
            },
          });
        })
        .catch((error) => {
          localStorage.removeItem("action");
          dispatch(ChangePasswordError());
        })
        .finally(() => {
          const action = localStorage.getItem("action");
          action === "passwordchanged"
            ? toast.success("Нууц үг солигдлоо.", {
                autoClose: 2000,
              })
            : toast.error("Алдаа гарлаа. Дахин оролдоно уу!", {
                autoClose: 2000,
              });
          localStorage.removeItem("action");
        });
    } else {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу!", {
        autoClose: 2000,
      });
      dispatch(ChangePasswordError());
    }
  };
};

export const ChangePasswordStart = () => {
  return {
    type: "CHANGE_PASSWORD_START",
  };
};

export const ChangePasswordSuccess = (result) => {
  return {
    type: "CHANGE_PASSWORD_SUCCESS",
    result,
  };
};

export const ChangePasswordError = () => {
  return {
    type: "CHANGE_PASSWORD_ERROR",
  };
};

// Эрх олгох
export const CreatePermission = (content) => {
  return function (dispatch) {
    dispatch(CreatePermissionStart());

    console.log(content);

    content?.user_id !== ""
      ? axios
          .post("frcusers/permission/", content)
          .then((result) => {
            localStorage.setItem("action", "permissionchanged");
            dispatch(CreatePermissionSuccess(result.data.result));
          })
          .then(async () => {
            const res = await axios.get("https://geolocation-db.com/json/");
            axios.post("amllogs", {
              USER_ID: localStorage.getItem("userId"),
              IP_ADDR: res.data.IPv4,
              METHOD: "POST",
              CONTENT: {
                ACTION: `/frcusers/permission/ хаяг руу өгөгдөл хадгаллаа.`,
                DATA: content,
              },
            });
          })
          .catch((error) => {
            localStorage.removeItem("action");
            dispatch(CreatePermissionError());
          })
          .finally(() => {
            const action = localStorage.getItem("action");
            action === "permissionchanged"
              ? toast.success("Эрх солигдлоо.", {
                  autoClose: 2000,
                })
              : toast.error("Алдаа гарлаа. Дахин оролдоно уу!", {
                  autoClose: 2000,
                });
            localStorage.removeItem("action");
          })
      : toast.error("Алдаа гарлаа. Дахин оролдоно уу!", {
          autoClose: 2000,
        });
  };
};

export const CreatePermissionStart = () => {
  return {
    type: "CREATE_PERMISSION_START",
  };
};

export const CreatePermissionSuccess = (result) => {
  return {
    type: "CREATE_PERMISSION_SUCCESS",
    result,
  };
};

export const CreatePermissionError = () => {
  return {
    type: "CREATE_PERMISSION_ERROR",
  };
};
