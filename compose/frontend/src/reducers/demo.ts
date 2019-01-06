import * as types from '../actions/action-types';

const initialState = {
  error: null,
  files: [],
  loadingFiles: false,
};

export default function demo(state = initialState, action: any) {
  const { files, error } = action;

  switch (action.type) {
    case types.FETCH_FILES:
      return {
        ...state,
        error: null,
        loadingFiles: true,
      };
    case types.FETCH_FILES_SUCCESS:
      return {
        ...state,
        error: null,
        files,
        loadingFiles: false,
      };
    case types.FETCH_FILES_ERROR:
      return {
        ...state,
        error,
        files: [],
        loadingFiles: false,
      };
    default:
      return state;
  }
}
