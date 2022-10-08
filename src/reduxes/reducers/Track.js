const initialState = {
  datasT: null,
  status: null,
  sector: null,
  types: null,
  orgs: null,
  v_day: null,
};

const TrackReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRACK_GET_DATAS_START":
      return {
        ...state,
      };

    case "TRACK_GET_DATAS_SUCCESS":
      return {
        ...state,
        datasT: action.result.datas,
        status: action.result.status,
        sector: action.result.sector,
        types: action.result.types,
        orgs: action.result.orgs,
        v_day: action.result.v_day,
      };

    case "TRACK_GET_DATAS_ERROR":
      return {
        ...state,
        datasT: null,
        status: null,
      };

    case "TRACK_GET_SAVES_START":
      return {
        ...state,
      };

    case "TRACK_GET_SAVES_SUCCESS":
      return {
        ...state,
        datasT: [...state.datasT, action.result],
      };

    case "TRACK_GET_SAVES_ERROR":
      return {
        ...state,
      };

    case "TRACK_EDIT_DATAS_START":
      return {
        ...state,
      };

    case "TRACK_EDIT_DATAS_SUCCESS":
      const trackDatas = [...state.datasT];
      trackDatas[action.index] = action.result;
      return {
        ...state,
        datasT: [...trackDatas],
      };

    case "TRACK_EDIT_DATAS_ERROR":
      return {
        ...state,
      };

    case "CHANGE_TRACK_START":
      return {
        ...state,
      };

    case "CHANGE_TRACK_SUCCESS":
      const newStatus = action.result.STATUS;
      const indexTrack = state.datasT?.findIndex(
        (d) => d.ID === action.result.VIOLATION_ID
      );
      state.datasT[indexTrack].STATUS_ID = newStatus;
      return {
        ...state,
        datasT: [...state.datasT],
      };

    case "CHANGE_TRACK_ERROR":
      return {
        ...state,
      };

    case "SAVE_REASON_SUCCESS":
      const outReason = action.result.OUT_REASON;
      const indexReason = state.datasT?.findIndex(
        (d) => d.ID === action.result.VIOLATION_ID
      );
      state.datasT[indexReason].OUT_REASON = outReason;
      state.datasT[indexReason].STATUS_ID = 3;
      return {
        ...state,
        datasT: [...state.datasT],
      };

    default:
      return state;
  }
};

export default TrackReducer;
