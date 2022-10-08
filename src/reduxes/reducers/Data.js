const initialState = {
  datas: null,
  supplies: null,
  result: {
    status: null,
    message: null,
  },
  period: {},
  periods: null,
  questionnaireChecking: false,
  approved: null,
  resultDatas: null,
  statistics: null,
  reports: null,
  notifications: null,
  assessApprove: null,
};

const DataReducer = (state = initialState, action) => {
  // console.log("ACTION 1: ", action?.result);

  switch (action.type) {
    case "GET_DATAS_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_DATAS_SUCCESS":
      return {
        ...state,
        datas: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_APPROVED_DATAS_SUCCESS":
      return {
        ...state,
        approved: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_DATAS_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "SUPPLY_DATAS_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "SUPPLY_DATAS_SUCCESS":
      return {
        ...state,
        supplies: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "SUPPLY_DATAS_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
        supplies: null,
      };

    case "SAVE_DATAS_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "SAVE_DATAS_SUCCESS":
      return {
        ...state,
        datas: [...state.datas, action.result],
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээлэл амжилттай хадгалагдлаа.",
        },
      };

    case "SAVE_APPROVE_DATAS_SUCCESS":
      return {
        ...state,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээлэл амжилттай хадгалагдлаа.",
        },
      };

    case "SAVE_DATAS_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг хадгалахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "EDIT_DATAS_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "EDIT_DATAS_SUCCESS":
      const newDatas = [...state.datas];
      newDatas[action.index] = action.result;

      return {
        ...state,
        datas: [...newDatas],
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээлэл амжилттай өөрчлөгдлөө.",
        },
      };

    case "EDIT_DATAS_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг хадгалахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "GET_PERIOD_START":
      return {
        ...state,
      };

    case "GET_PERIOD_SUCCESS":
      return {
        ...state,
        result: {
          ...state.result,
          status: "success",
          message: "Хугацааг, амжилттай татлаа.",
        },
        period: action.result[0],
      };

    case "GET_PERIOD_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Хугацааг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "GET_PERIOD1_SUCCESS":
      return {
        ...state,
        result: {
          ...state.result,
          status: "success",
          message: "Хугацааг, амжилттай татлаа.",
        },
        periods: action.result,
      };

    case "GET_PERIOD1_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Хугацааг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
        periods: null,
      };

    case "GET_PERIOD_STATUS_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_PERIOD_STATUS_SUCCESS":
      return {
        ...state,
        datas: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_PERIOD_STATUS_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "QUESTIONNAIRE_CHECKING_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
        questionnaireChecking: false,
      };

    case "QUESTIONNAIRE_CHECKING_SUCCESS":
      return {
        ...state,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
        questionnaireChecking: action.result,
      };

    case "QUESTIONNAIRE_CHECKING_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
        questionnaireChecking: false,
      };

    case "VIEW_ASSESS_START":
      return {
        ...state,
        result: {
          status: null,
          message: null,
        },
        supplies: null,
      };

    case "VIEW_ASSESS_SUCCESS":
      return {
        ...state,
        supplies: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "VIEW_ASSESS_ERROR":
      return {
        ...state,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
        supplies: null,
      };

    case "GET_RESULTS_START":
      return {
        ...state,
        resultDatas: null,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_RESULTS_SUCCESS":
      return {
        ...state,
        resultDatas: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_RESULTS_ERROR":
      return {
        ...state,
        resultDatas: null,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "GET_STATISTICS_START":
      return {
        ...state,
        statistics: null,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_STATISTICS_SUCCESS":
      return {
        ...state,
        statistics: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_STATISTICS_ERROR":
      return {
        ...state,
        statistics: null,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "GET_REPORTS_START":
      return {
        ...state,
        reports: null,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_REPORTS_SUCCESS":
      return {
        ...state,
        reports: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "CLEAR_REPORTS_SUCCESS":
      return {
        ...state,
        reports: null,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг цэвэрлэлээ.",
        },
      };

    case "GET_REPORTS_ERROR":
      return {
        ...state,
        reports: null,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "GET_LOGS_START":
      return {
        ...state,
        datas: null,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_LOGS_SUCCESS":
      return {
        ...state,
        datas: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_LOGS_ERROR":
      return {
        ...state,
        datas: null,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "GET_NOTIFICATIONS_START":
      return {
        ...state,
        notifications: null,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        notifications: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_NOTIFICATIONS_ERROR":
      return {
        ...state,
        notifications: null,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    case "GET_ASSESS_APPROVE_START":
      return {
        ...state,
        assessApprove: null,
        result: {
          status: null,
          message: null,
        },
      };

    case "GET_ASSESS_APPROVE_SUCCESS":
      // console.log(action.result);
      return {
        ...state,
        assessApprove: action.result,
        result: {
          ...state.result,
          status: "success",
          message: "Мэдээллийг татаж дууслаа.",
        },
      };

    case "GET_ASSESS_APPROVE_ERROR":
      return {
        ...state,
        assessApprove: null,
        result: {
          ...state.result,
          status: "error",
          message: "Мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.",
        },
      };

    default:
      return state;
  }
};

export default DataReducer;
