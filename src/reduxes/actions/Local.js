import axios from "../../axios";

// Модулийн мэдээлэл хадгалах
export const storeModule = (id = null, name = null) => {
  return function (dispatch) {
    if (id === null || name === null) {
      dispatch(clearModuleSuccess());
    } else {
      dispatch(storeModuleSuccess(id, name));
    }
  };
};

export const storeModuleSuccess = (id, name) => {
  return {
    type: "STORE_MODULE_SUCCESS",
    id,
    name,
  };
};

export const clearModuleSuccess = () => {
  return {
    type: "CLEAR_MODULE_SUCCESS",
  };
};

// Цэсний мэдээлэл хадгалах
export const storeMenu = (
  id = null,
  module = null,
  name = null,
  module_name = null
) => {
  return function (dispatch) {
    if (id === null) {
      dispatch(clearMenuSuccess());
    } else {
      dispatch(storeMenuSuccess(id, module, name, module_name));
    }
  };
};

export const storeMenuSuccess = (id, module, name, module_name) => {
  return {
    type: "STORE_MENU_SUCCESS",
    id,
    module,
    name,
    module_name,
  };
};

export const clearMenuSuccess = () => {
  return {
    type: "CLEAR_MENU_SUCCESS",
  };
};

// Үйлдлийг хадгалах
export const storeAction = (action = null) => {
  return function (dispatch) {
    if (action === null) {
      dispatch(clearActionSuccess());
    } else {
      dispatch(storeActionSuccess(action));
    }
  };
};

export const storeActionSuccess = (action) => {
  return {
    type: "STORE_ACTION_SUCCESS",
    action,
  };
};

export const clearActionSuccess = () => {
  return {
    type: "CLEAR_ACTION_SUCCESS",
  };
};

// Үйлдлийг хадгалах
export const storeReference = (reference = null, action = null) => {
  return function (dispatch) {
    if (reference === null) {
      dispatch(clearReferenceSuccess());
    } else {
      // console.log(reference);
      // console.log(action);
      axios
        .get(reference.ref_name)
        .then((result) => {
          // console.log(result.data);
          if (action === "collapselist") {
            dispatch(
              storeReferenceActionSuccess(
                result.data.result,
                reference.field_name
              )
            );
          } else if (action === null) {
            dispatch(
              storeReferenceSuccess(result.data.result, reference.field_name)
            );
          }
        })
        .catch((error) => {
          dispatch(clearReferenceSuccess());
        });
    }
  };
};

export const storeReferenceSuccess = (references, field_name) => {
  return {
    type: "STORE_REFERENCE_SUCCESS",
    references,
    field_name,
  };
};

export const storeReferenceActionSuccess = (referencesAction, field_name) => {
  return {
    type: "STORE_ACTION_REFERENCE_SUCCESS",
    referencesAction,
    field_name,
  };
};

export const clearReferenceSuccess = () => {
  return {
    type: "CLEAR_REFERENCE_SUCCESS",
  };
};

// Ангиллыг хадгалах
export const getClassifications = (classification = null) => {
  return function (dispatch) {
    if (classification === null) {
      dispatch(clearClassificationsSuccess());
    } else {
      axios
        .get(classification + "/status/1")
        .then((result) => {
          dispatch(getClassificationsSuccess(result.data.result));
        })
        .catch((error) => {
          dispatch(clearClassificationsSuccess());
        });
    }
  };
};

export const getClassificationsSuccess = (classifications) => {
  return {
    type: "GET_CLASSIFICATION_SUCCESS",
    classifications,
  };
};

export const clearClassificationsSuccess = () => {
  return {
    type: "CLEAR_CLASSIFICATION_SUCCESS",
  };
};

// Асуулгын хариултын төрлийг хадгалах
export const getAnswerTypes = (answerType = null) => {
  return function (dispatch) {
    if (answerType === null) {
      dispatch(clearAnswerTypesSuccess());
    } else {
      axios
        .get(answerType)
        .then((result) => {
          dispatch(getAnswerTypesSuccess(result.data.result));
        })
        .catch((error) => {
          dispatch(clearAnswerTypesSuccess());
        });
    }
  };
};

export const getAnswerTypesSuccess = (answerTypes) => {
  return {
    type: "GET_ANSWERTYPES_SUCCESS",
    answerTypes,
  };
};

export const clearAnswerTypesSuccess = () => {
  return {
    type: "CLEAR_ANSWERTYPES_SUCCESS",
  };
};

// Үнэлгээний хугацааг хадгалах
export const storePeriod = (period) => {
  return function (dispatch) {
    if (period === null) {
      dispatch(clearPeriodSuccess());
    } else {
      dispatch(storePeriodSuccess(period));
    }
  };
};

export const storePeriodSuccess = (period) => {
  return {
    type: "STORE_PERIOD_SUCCESS",
    period,
  };
};

export const clearPeriodSuccess = () => {
  return {
    type: "CLEAR_PERIOD_SUCCESS",
  };
};

// Үнэлгээний хугацааг хадгалах
export const storeQuestionnaireResult = (data) => {
  return function (dispatch) {
    if (data === null) {
      dispatch(clearQuestionnaireResultSuccess());
    } else {
      dispatch(storeQuestionnaireResultSuccess(data));
    }
  };
};

export const storeQuestionnaireResultSuccess = (data) => {
  return {
    type: "STORE_QUESTIONNAIRE_RESULT_SUCCESS",
    data,
  };
};

export const clearQuestionnaireResultSuccess = () => {
  return {
    type: "CLEAR_QUESTIONNAIRE_RESULT_SUCCESS",
  };
};
