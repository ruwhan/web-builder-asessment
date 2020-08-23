import {
  SAVED_PAGES_LOADING,
  SAVED_PAGES_LOAD_FAIL,
  SAVED_PAGES_LOAD_SUCCESS,
} from "./actionTypes";
import { push } from "connected-react-router";
import storage from "./storageHelpers";

/**
 * Saved pages loading dispatcher.
 * 
 * @returns {Object}
 */
export const savedPagesLoading = () => ({
  type: SAVED_PAGES_LOADING
})

/**
 * Saved pages load success dispatcher.
 * 
 * @param {Object} savedPages Array of saved pages, complete with styles, htmls, assets.
 * @returns {Object}
 */
export const savedPagesLoadSuccess = (savedPages) => ({
  type: SAVED_PAGES_LOAD_SUCCESS,
  payload: { savedPages }
})

/**
 * Saved pages load fail dispatcher.
 * 
 * @returns {Object}
 */
export const savedPagesLoadFail = () => ({
  type: SAVED_PAGES_LOAD_FAIL
})

/**
 * Load saved pages redux thunk actions.
 * 
 * @returns {Promise}
 */
export const loadSavedPages = () => {
  return async (dispatch, getState) => {
    const db = storage();
    let mapped = {};

    dispatch(savedPagesLoading());  
    return db.collection('templates').get()
        .then((res) => {
          console.log(res.docs);
          console.log(res.docs.map((item) => item.data()));
          console.log(res.docs.map((item) => item.id));

          mapped = res.docs.map((item) => {
            const id = item.id.endsWith('-') ? item.id.substr(0, item.id.length - 1) : item.id;
            return { ...item.data(), id }
          });

          dispatch(savedPagesLoadSuccess(mapped));
        })
        .catch((err) => {
          dispatch(savedPagesLoadFail());
          console.error(err);
        });
  }
}

/**
 * Navigate to build pages redux actions.
 * 
 * @param {ID} id Saved page id
 */
export const navigateToBuildPages = (id) => {
  return (dispatch, getState) => {
    dispatch(push(`/build?storeId=${id}`));
  }
}

/**
 * Navigate to actual pages redux actions.
 * 
 * @param {ID} id Saved page id
 */
export const navigateToActualPage = (id) => {
  return (dispatch, getState) => {
    dispatch(push(`/page/${id}`));
  }
}
