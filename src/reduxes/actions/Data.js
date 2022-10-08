import axios from "../../axios";

//Өгөгдөл татах хэсэг
export const getDatas = (reference, user_id = null) => {
  return function (dispatch) {
    dispatch(getDatasStart());

    let api_name;
    reference?.api_name === "amlprofilecompliances/"
      ? (api_name = reference?.api_name + localStorage.getItem("userId"))
      : (api_name = reference?.api_name);

    if (user_id !== null) {
      api_name = api_name + user_id;
    }

    reference?.api_name
      ? axios
          .get(api_name)
          .then((result) => {
            if (reference.api_name === "amlquestionnaireapproves") {
              dispatch(getApprovedDatasSuccess(result.data.result));
            } else {
              dispatch(getDatasSuccess(result.data.result));
            }
          })
          .then(async () => {
            const res = await axios.get("https://geolocation-db.com/json/");
            axios.post("amllogs", {
              USER_ID: localStorage.getItem("userId"),
              IP_ADDR: res.data.IPv4,
              METHOD: "GET",
              CONTENT: {
                ACTION: `/${reference.api_name} хаягнаас мэдээлэл татаж авлаа`,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch(getDatasError());
          })
      : dispatch(getDatasError());
  };
};

export const getDatasStart = () => {
  return {
    type: "GET_DATAS_START",
  };
};

export const getDatasSuccess = (result) => {
  return {
    type: "GET_DATAS_SUCCESS",
    result,
  };
};

export const getApprovedDatasSuccess = (result) => {
  return {
    type: "GET_APPROVED_DATAS_SUCCESS",
    result,
  };
};

export const getDatasError = () => {
  return {
    type: "GET_DATAS_ERROR",
  };
};

//Өгөгдөл хадгалах хэсэг

export const saveDatas = (apiname, newData) => {
  return function (dispatch) {
    dispatch(saveDatasStart());

    let apiname1;

    if (
      apiname === "amlceos/" ||
      apiname === "amlprograms/" ||
      apiname === "amlgrants/" ||
      apiname === "amlcompanies/"
    ) {
      apiname1 = apiname + newData.C_BY;
    } else {
      apiname1 = apiname;
    }

    // console.log(apiname);
    // console.log(apiname1);
    // console.log(newData);

    const data = new FormData();
    data.append("file", newData.FILENAMES);

    axios
      .post(apiname1, newData)
      .then((result) => {
        if (result.data.success === true) {
          if (apiname1 === "amlquestionnaireapproves") {
            dispatch(saveApproveDatasSuccess());
          } else {
            axios
              .post(apiname + "upload/" + result.data.id, data)
              .then((result) => dispatch(saveDatasSuccess(newData)))
              .catch((error) => dispatch(saveDatasError()));
          }
        } else {
          dispatch(saveDatasError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/${apiname} хаяг руу өгөгдөл хадгаллаа`,
            DATA: newData,
          },
        });
      })
      .catch((error) => {
        dispatch(saveDatasError());
      });
  };
};

export const saveDatasStart = () => {
  return {
    type: "SAVE_DATAS_START",
  };
};

export const saveDatasSuccess = (result) => {
  return {
    type: "SAVE_DATAS_SUCCESS",
    result,
  };
};

export const saveApproveDatasSuccess = () => {
  return {
    type: "SAVE_APPROVE_DATAS_SUCCESS",
  };
};

export const saveDatasError = () => {
  return {
    type: "SAVE_DATAS_ERROR",
  };
};

//Өгөгдөл өөрчлөх хэсэг
export const editDatas = (apiname, editData, index) => {
  return function (dispatch) {
    dispatch(editDatasStart());

    // console.log(apiname);
    // console.log(editData);
    // console.log(index);

    const data = new FormData();
    data.append("file", editData.FILENAMES);

    axios
      .put(apiname + "/" + editData.ID, editData)
      .then((result) => {
        if (result.data.success === true) {
          if (editData.FILENAMES !== null) {
            axios.post(apiname + "upload/" + editData.ID, data);
          }
          dispatch(editDatasSuccess(editData, index));
        } else {
          dispatch(editDatasError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "PUT",
          CONTENT: {
            ACTION: `/${apiname}/${editData.ID} хаягт өгөгдөл өөрчиллөө`,
            DATA: editData,
          },
        });
      })
      .catch((error) => {
        dispatch(editDatasError());
      });
  };
};

export const editDatasStart = () => {
  return {
    type: "EDIT_DATAS_START",
  };
};

export const editDatasSuccess = (result, index) => {
  return {
    type: "EDIT_DATAS_SUCCESS",
    result,
    index,
  };
};

export const editDatasError = () => {
  return {
    type: "EDIT_DATAS_ERROR",
  };
};

//Хангах өгөгдөл татах хэсэг
export const supplyDatas = (parameter) => {
  return function (dispatch) {
    dispatch(supplyDatasStart());

    axios
      .get(parameter.api_name)
      .then((result) => {
        dispatch(supplyDatasSuccess(result.data.result));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/${parameter.api_name} хаягнаас өгөгдөл авлаа`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(supplyDatasError());
      });
  };
};

export const supplyDatasStart = () => {
  return {
    type: "SUPPLY_DATAS_START",
  };
};

export const supplyDatasSuccess = (result) => {
  return {
    type: "SUPPLY_DATAS_SUCCESS",
    result,
  };
};

export const supplyDatasError = () => {
  return {
    type: "SUPPLY_DATAS_ERROR",
  };
};

//Асуулгын хугацаа татах хэсэг
export const getPeriod = (parameter = null) => {
  return function (dispatch) {
    dispatch(getPeriodStart());

    if (parameter === null) {
      axios
        .get("amlperiods/period")
        .then((result) => {
          dispatch(getPeriodSuccess(result.data.result));
        })
        .then(async () => {
          const res = await axios.get("https://geolocation-db.com/json/");
          axios.post("amllogs", {
            USER_ID: localStorage.getItem("userId"),
            IP_ADDR: res.data.IPv4,
            METHOD: "GET",
            CONTENT: {
              ACTION: `/amlperiods/period хаягнаас өгөгдөл авлаа`,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch(getPeriodError());
        });
    } else {
      axios
        .get(parameter.api_name)
        .then((result) => {
          dispatch(getPeriod1Success(result.data.result));
        })
        .catch((error) => {
          console.log(error);
          dispatch(getPeriod1Error());
        });
    }
  };
};

export const getPeriodStart = () => {
  return {
    type: "GET_PERIOD_START",
  };
};

export const getPeriodSuccess = (result) => {
  return {
    type: "GET_PERIOD_SUCCESS",
    result,
  };
};

export const getPeriodError = () => {
  return {
    type: "GET_PERIOD_ERROR",
  };
};

export const getPeriod1Success = (result) => {
  return {
    type: "GET_PERIOD1_SUCCESS",
    result,
  };
};

export const getPeriod1Error = () => {
  return {
    type: "GET_PERIOD1_ERROR",
  };
};

//Асуулгын хугацаа татах хэсэг
export const getDatasByStatus = (reference, status) => {
  return function (dispatch) {
    dispatch(getDatasByStatusStart());

    axios
      .get(reference.api_name + "status/" + status)
      .then((result) => {
        // console.log(result.data.result);
        dispatch(getDatasByStatusSuccess(result.data.result));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/${reference.api_name}/status/${status} хаягнаас өгөгдөл авлаа`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getDatasByStatusError());
      });
  };
};

export const getDatasByStatusStart = () => {
  return {
    type: "GET_PERIOD_STATUS_START",
  };
};

export const getDatasByStatusSuccess = (result) => {
  return {
    type: "GET_PERIOD_STATUS_SUCCESS",
    result,
  };
};

export const getDatasByStatusError = () => {
  return {
    type: "GET_PERIOD_STATUS_ERROR",
  };
};

//Асуулга хадгалах хэсэг
export const saveResults = (results, period_id) => {
  return function (dispatch) {
    dispatch(saveResultsStart());

    const answers = {
      USER_ID: localStorage.getItem("userId"),
      RESULTS: results,
      PERIOD_ID: period_id,
    };

    // console.log(answers);

    axios
      .post("amlquestionnaireresults", answers)
      .then((result) => {
        if (result.data.success === true) {
          dispatch(saveDatasSuccess(result.data.success));
        } else {
          dispatch(saveDatasError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/amlquestionnaireresults хаяг руу өгөгдөл хадгаллаа`,
          },
        });
      })
      .catch((error) => {
        dispatch(saveDatasError());
      });
  };
};

export const saveResultsStart = () => {
  return {
    type: "SAVE_RESULTS_START",
  };
};

export const saveResultsSuccess = (result) => {
  return {
    type: "SAVE_RESULTS_SUCCESS",
    result,
  };
};

export const saveResultsError = () => {
  return {
    type: "SAVE_RESULTS_ERROR",
  };
};

//Асуулга бөглөсний шалгах хэсэг
export const questionnaireChecking = (api_name, user_id) => {
  return function (dispatch) {
    dispatch(questionnaireCheckingStart());

    axios
      .get(api_name + "checking/" + user_id)
      .then((result) => {
        if (result.data.success === true) {
          dispatch(questionnaireCheckingSuccess(result.data.result));
        } else {
          dispatch(questionnaireCheckingError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/${api_name}/checking/${user_id} хаягнаас өгөгдөл авлаа`,
          },
        });
      })
      .catch((error) => {
        dispatch(questionnaireCheckingError());
      });
  };
};

export const questionnaireCheckingStart = () => {
  return {
    type: "QUESTIONNAIRE_CHECKING_START",
  };
};

export const questionnaireCheckingSuccess = (result) => {
  return {
    type: "QUESTIONNAIRE_CHECKING_SUCCESS",
    result,
  };
};

export const questionnaireCheckingError = () => {
  return {
    type: "QUESTIONNAIRE_CHECKING_ERROR",
  };
};

//Хангах өгөгдөл татах хэсэг
export const viewAssess = (parameter, data) => {
  return function (dispatch) {
    dispatch(viewAssessStart());

    // console.log({ USER_ID: data.ID, SECTOR: data.ORGTYPE_ID });

    axios
      .post(parameter, {
        USER_ID: data.ID,
        SECTOR: data.ORGTYPE_ID,
        PERIOD_ID: data.PERIOD_ID,
      })
      .then((result) => {
        dispatch(viewAssessSuccess(result.data));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/${parameter} хаяг руу өгөгдөл хадгаллаа`,
            DATA: {
              USER_ID: data.ID,
              SECTOR: data.ORGTYPE_ID,
              PERIOD_ID: data.PERIOD_ID,
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(viewAssessError());
      });
  };
};

export const viewAssessStart = () => {
  return {
    type: "VIEW_ASSESS_START",
  };
};

export const viewAssessSuccess = (result) => {
  return {
    type: "VIEW_ASSESS_SUCCESS",
    result,
  };
};

export const viewAssessError = () => {
  return {
    type: "VIEW_ASSESS_ERROR",
  };
};

//Үнэлгээний хариу татах хэсэг
export const getResults = (reference, data) => {
  return function (dispatch) {
    dispatch(getResultsStart());

    axios
      .post(reference, data)
      .then((result) => {
        if (result.data.success === true) {
          dispatch(getResultsSuccess(result.data.result));
        } else {
          dispatch(getResultsError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/${reference} хаягнаас өгөгдөл авлаа`,
            DATA: data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getResultsError());
      });
  };
};

export const getResultsStart = () => {
  return {
    type: "GET_RESULTS_START",
  };
};

export const getResultsSuccess = (result) => {
  return {
    type: "GET_RESULTS_SUCCESS",
    result,
  };
};

export const getResultsError = (result) => {
  return {
    type: "GET_RESULTS_ERROR",
    result,
  };
};

//Үнэлгээний хариу татах хэсэг
export const getStatistics = (reference, period) => {
  return function (dispatch) {
    dispatch(getStatisticsStart());

    // console.log("PERIOD: ", period);

    axios
      .get(reference + "/" + period)
      .then((result) => {
        if (result.data.success === true) {
          dispatch(getStatisticsSuccess(result.data.result));
        } else {
          dispatch(getStatisticsError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/${reference}/${period} хаягнаас өгөгдөл авлаа`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getStatisticsError());
      });
  };
};

export const getStatisticsStart = () => {
  return {
    type: "GET_STATISTICS_START",
  };
};

export const getStatisticsSuccess = (result) => {
  return {
    type: "GET_STATISTICS_SUCCESS",
    result,
  };
};

export const getStatisticsError = (result) => {
  return {
    type: "GET_STATISTICS_ERROR",
    result,
  };
};

//Үнэлгээний хариу татах хэсэг
export const getReports = (api_name = null, data = null) => {
  return async (dispatch) => {
    dispatch(getReportsStart());
    // console.log("GET_REPORTS_DATA: ", data);
    // console.log("GET_REPORTS_API: ", api_name);

    api_name === null
      ? dispatch(clearReportsSuccess())
      : axios
          .post(api_name, data)
          .then((result) => {
            if (result.data.success === true) {
              // console.log("ACTION: ", result.data);
              dispatch(getReportsSuccess(result.data));
            } else {
              dispatch(getReportsError());
            }
          })
          .then(async () => {
            const res = await axios.get("https://geolocation-db.com/json/");
            axios.post("amllogs", {
              USER_ID: localStorage.getItem("userId"),
              IP_ADDR: res.data.IPv4,
              METHOD: "POST",
              CONTENT: {
                ACTION: `/${api_name} хаяг руу өгөгдөл хадгаллаа`,
                DATA: data,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch(getReportsError());
          });
  };
};

export const getReportsStart = () => {
  return {
    type: "GET_REPORTS_START",
  };
};

export const getReportsSuccess = (result) => {
  return {
    type: "GET_REPORTS_SUCCESS",
    result,
  };
};

export const clearReportsSuccess = () => {
  return {
    type: "CLEAR_REPORTS_SUCCESS",
  };
};

export const getReportsError = (result) => {
  return {
    type: "GET_REPORTS_ERROR",
    result,
  };
};

//Үйлдлийн түүх харах хэсэг
export const getLogs = (api_name, periods) => {
  return function (dispatch) {
    dispatch(getLogsStart());

    // console.log(api_name, periods);

    axios
      .post(api_name, periods)
      .then((result) => {
        if (result.data.success === true) {
          dispatch(getLogsSuccess(result.data.result));
        } else {
          dispatch(getLogsError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/${api_name} хаягнаас өгөгдөл авлаа`,
            DATA: periods,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getLogsError());
      });
  };
};

export const getLogsStart = () => {
  return {
    type: "GET_LOGS_START",
  };
};

export const getLogsSuccess = (result) => {
  return {
    type: "GET_LOGS_SUCCESS",
    result,
  };
};

export const getLogsError = () => {
  return {
    type: "GET_LOGS_ERROR",
  };
};

//Мэдэгдэл татах хэсэг
export const getNotifications = () => {
  return async function (dispatch) {
    dispatch(getNotificationsStart());

    await axios
      .get("/amlnotifications")
      .then((result) => {
        // console.log(result.data);
        dispatch(getNotificationsSuccess(result.data));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        await axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/amlnotifications хаягнаас мэдээлэл татаж авлаа`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getNotificationsError());
      });
  };
};

export const getNotificationsStart = () => {
  return {
    type: "GET_NOTIFICATIONS_START",
  };
};

export const getNotificationsSuccess = (result) => {
  return {
    type: "GET_NOTIFICATIONS_SUCCESS",
    result,
  };
};

export const getNotificationsError = () => {
  return {
    type: "GET_NOTIFICATIONS_ERROR",
  };
};

//Мэдэгдэл хадгалах хэсэг
export const saveNotifications = (data) => {
  return function (dispatch) {
    dispatch(saveNotificationsStart());

    // console.log("DATA: ", data);

    axios
      .post("/amlnotifications", data)
      .then((result) => {
        if (result.data.success === true) {
          dispatch(saveNotificationsSuccess(data));
        } else {
          dispatch(saveNotificationsError());
        }
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "POST",
          CONTENT: {
            ACTION: `/amlnotifications хаяг руу өгөгдөл хадгаллаа`,
            DATA: data,
          },
        });
      })
      .catch((error) => {
        dispatch(saveNotificationsError());
      });
  };
};

export const saveNotificationsStart = () => {
  return {
    type: "SAVE_DATAS_START",
  };
};

export const saveNotificationsSuccess = (result) => {
  return {
    type: "SAVE_DATAS_SUCCESS",
    result,
  };
};

export const saveNotificationsError = () => {
  return {
    type: "SAVE_DATAS_ERROR",
  };
};

export const getAssessApprove = () => {
  return function (dispatch) {
    dispatch(getAssessApproveStart());

    axios
      .get("amlquestionnaireresults/assessapprove")
      .then((result) => {
        dispatch(getAssessApproveSuccess(result.data.result));
      })
      .then(async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        axios.post("amllogs", {
          USER_ID: localStorage.getItem("userId"),
          IP_ADDR: res.data.IPv4,
          METHOD: "GET",
          CONTENT: {
            ACTION: `/amlquestionnaireresults/assessapprove хаягнаас мэдээлэл татаж авлаа`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getAssessApproveError());
      });
  };
};

export const getAssessApproveStart = () => {
  return {
    type: "GET_ASSESS_APPROVE_START",
  };
};

export const getAssessApproveSuccess = (result) => {
  return {
    type: "GET_ASSESS_APPROVE_SUCCESS",
    result,
  };
};

export const getAssessApproveError = () => {
  return {
    type: "GET_ASSESS_APPROVE_ERROR",
  };
};
