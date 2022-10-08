import axios from "../../axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

// Өгөгдлийг татах
export const getDatasT = (api_name) => {
  return function (dispatch) {
    dispatch(getDatasStart());

    // console.log("API_NAME: ", api_name);
    axios
      .get(api_name)
      .then((result) => {
        // console.log("RESULT: ", result.data);
        dispatch(getDatasSuccess(result.data));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/${api_name} хаягнаас өгөгдөл авлаа.`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getDatasError());
      });
  };
};

export const getDatasStart = () => {
  return {
    type: "TRACK_GET_DATAS_START",
  };
};

export const getDatasSuccess = (result) => {
  return {
    type: "TRACK_GET_DATAS_SUCCESS",
    result,
  };
};

export const getDatasError = () => {
  return {
    type: "TRACK_GET_DATAS_ERROR",
  };
};

// Өгөгдлийг хадгалах
export const saveDatasT = (api_name, data, action) => {
  return function (dispatch) {
    dispatch(saveDatasStart());

    if (action === "reason") {
      api_name = api_name + "reason";
    }

    // console.log(api_name);
    // console.log(data);

    const data_upload = new FormData();
    data_upload.append("file", data.FILENAMES);

    axios
      .post(api_name, data)
      .then((result) => {
        if (action === "reason") {
          axios
            .post(api_name + "/upload/" + data.VIOLATION_ID, data_upload)
            .then((result) => dispatch(saveReasonSuccess(data)))
            .catch((error) => dispatch(saveDatasError()));
        } else {
          dispatch(saveDatasSuccess(data));
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/${api_name}/ хаяг руу өгөгдөл хадгаллаа.`,
            DATA: data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(saveDatasError());
      })
      .finally(() => {
        toast.success("Мэдээлэл амжилттай хадгалагдлаа.", {
          autoClose: 2000,
        });
      });
  };
};

export const saveDatasStart = () => {
  return {
    type: "TRACK_GET_SAVES_START",
  };
};

export const saveReasonSuccess = (result) => {
  return {
    type: "TRACK_SAVE_REASON_SUCCESS",
    result,
  };
};

export const saveDatasSuccess = (result) => {
  return {
    type: "TRACK_GET_SAVES_SUCCESS",
    result,
  };
};

export const saveDatasError = () => {
  return {
    type: "TRACK_GET_SAVES_ERROR",
  };
};

export const trackEditDatas = (api_name, data, index) => {
  return function (dispatch) {
    dispatch(trackEditDatasStart());

    axios
      .put(api_name + "/" + data.ID, data)
      .then((result) => {
        if (result.data.success === true)
          dispatch(trackEditDatasSuccess(data, index));
        else dispatch(trackEditDatasError());
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "PUT",
          CONTENT: {
            ACTION: `/${api_name}/${data.ID}/ хаягт өгөгдөл өөрчиллөө.`,
            DATA: data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(trackEditDatasError());
      })
      .finally(() => {
        toast.success("Мэдээлэл амжилттай засагдлаа.", {
          autoClose: 2000,
        });
      });
  };
};

export const trackEditDatasStart = () => {
  return {
    type: "TRACK_EDIT_DATAS_START",
  };
};

export const trackEditDatasSuccess = (result, index) => {
  return {
    type: "TRACK_EDIT_DATAS_SUCCESS",
    result,
    index,
  };
};

export const trackEditDatasError = () => {
  return {
    type: "TRACK_EDIT_DATAS_ERROR",
  };
};

// Трак өөрчлөх
export const changeTrack = (api_name, data) => {
  return function (dispatch) {
    dispatch(changeTrackStart());
    axios
      .post(api_name + "/changeTrack", data)
      .then((result) => {
        dispatch(changeTrackSuccess(data));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/${api_name}/changeTrack/ хаяг руу өгөгдөл хадгаллаа.`,
            DATA: data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(changeTrackError());
      })
      .finally(() => {
        toast.success(data.MSG, {
          autoClose: 2000,
        });
      });
  };
};

export const changeTrackStart = () => {
  return {
    type: "CHANGE_TRACK_START",
  };
};

export const changeTrackSuccess = (result) => {
  return {
    type: "CHANGE_TRACK_SUCCESS",
    result,
  };
};

export const changeTrackError = () => {
  return {
    type: "CHANGE_TRACK_ERROR",
  };
};
