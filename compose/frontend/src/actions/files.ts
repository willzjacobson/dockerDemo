import axios from 'axios';
import redux from 'redux';

import { IFiles } from '../interfaces';
import * as types from './action-types';

export function beginFetchFiles() {
  return {
    type: types.FETCH_FILES,
  };
}

export function fetchFilesSuccess(data: IFiles) {
  return {
    files: data,
    type: types.FETCH_FILES_SUCCESS,
  };
}

export function fetchFilesError(error: Error) {
  return {
    error,
    type: types.FETCH_FILES_ERROR,
  };
}

export function fetchFiles(expressId: string) {
  return async (dispatch: redux.Dispatch) => {
    dispatch(beginFetchFiles());

    try {
      const { data } = await axios.get(`/api/files/?expressId=${expressId}`);
      dispatch(fetchFilesSuccess(data));
    } catch (err) {
      dispatch(fetchFilesError(err));
    }
  };
}
