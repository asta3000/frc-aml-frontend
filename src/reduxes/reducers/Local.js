const initialState = {
  menu: {
    id: null,
    module: null,
    name: null,
    module_name: null,
  },
  module: {
    id: null,
    name: null,
  },
  action: null,
  references: {},
  referencesAction: null,
  classifications: null,
  answerTypes: null,
  period: null,
  questionnaireResult: null,
};

const LocalReducer = (state = initialState, action) => {
  // console.log("ACTION: ", action);

  switch (action.type) {
    case "STORE_MODULE_SUCCESS":
      return {
        ...state,
        module: {
          id: action.id,
          name: action.name,
        },
      };

    case "CLEAR_MODULE_SUCCESS":
      return {
        ...state,
        module: {
          id: null,
          name: null,
        },
      };

    case "STORE_MENU_SUCCESS":
      return {
        ...state,
        menu: {
          id: action.id,
          module: action.module,
          name: action.name,
          module_name: action.module_name,
        },
      };

    case "CLEAR_MENU_SUCCESS":
      return {
        ...state,
        menu: {
          id: null,
          module: null,
          name: null,
          module_name: null,
        },
      };

    case "STORE_ACTION_SUCCESS":
      return {
        ...state,
        action: action.action,
      };

    case "CLEAR_ACTION_SUCCESS":
      return {
        ...state,
        action: null,
      };

    case "STORE_REFERENCE_SUCCESS":
      return {
        ...state,
        references: {
          ...state.references,
          [action.field_name]: action.references,
        },
      };

    case "STORE_ACTION_REFERENCE_SUCCESS":
      return {
        ...state,
        referencesAction: {
          ...state.referencesAction,
          [action.field_name]: action.referencesAction,
        },
      };

    case "CLEAR_REFERENCE_SUCCESS":
      return {
        ...state,
        references: null,
      };

    case "GET_CLASSIFICATION_SUCCESS":
      return {
        ...state,
        references: {
          ...state.references,
        },
        classifications: action.classifications,
      };

    case "CLEAR_CLASSIFICATION_SUCCESS":
      return {
        ...state,
        references: {
          ...state.references,
        },
        classifications: null,
      };

    case "GET_ANSWERTYPES_SUCCESS":
      return {
        ...state,
        references: {
          ...state.references,
        },
        answerTypes: action.answerTypes,
      };

    case "CLEAR_ANSWERTYPES_SUCCESS":
      return {
        ...state,
        references: {
          ...state.references,
        },
        answerTypes: null,
      };

    case "STORE_PERIOD_SUCCESS":
      return {
        ...state,
        period: action.period,
      };

    case "CLEAR_PERIOD_SUCCESS":
      return {
        ...state,
        period: null,
      };

    case "STORE_QUESTIONNAIRE_RESULT_SUCCESS":
      return {
        ...state,
        questionnaireResult: action.data,
      };

    case "CLEAR_QUESTIONNAIRE_RESULT_SUCCESS":
      return {
        ...state,
        questionnaireResult: null,
      };

    default:
      return state;
  }
};

export default LocalReducer;
