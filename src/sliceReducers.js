import {
  SAVED_PAGES_LOADING,
  SAVED_PAGES_LOAD_FAIL,
  SAVED_PAGES_LOAD_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  entities: {
    byId: {},
    ids: [],
  }
}

export const loadingSavedPages = (state, action) => {
  return Object.assign({}, state, {
    loading: true,
  });
}

export const updateSavedPages = (state, action) => {
  const { savedPages } = action.payload;
  const { byId, ids } = state.entities;

  savedPages.forEach((item) => {
    byId[item.id] = item;

    if (ids.indexOf(item.id) === -1) {
      ids.push(item.id);
    }
  });

  return Object.assign({}, state, {
    loading: false,
    entities: {
      byId,
      ids,
    }
  });
}

export const stopLoading = (state, action) => {
  return Object.assign({}, state, {
    loading: false,
  });
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVED_PAGES_LOADING:
      return loadingSavedPages(state, action);

    case SAVED_PAGES_LOAD_SUCCESS: 
      return updateSavedPages(state, action);

    case SAVED_PAGES_LOAD_FAIL:
      return stopLoading(state, action);
  
    default:
      return initialState;
  }
}
