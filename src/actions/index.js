import FakeServer from "../util/fakeServer";
let fakeServer;
if (process.env.NODE_ENV === "development") {
  fakeServer = new FakeServer();
}

const env = require("../env.json");

export const FETCH_ALL_ITEMS_BEGIN = 'FETCH_ALL_ITEMS_BEGIN';
export const FETCH_ALL_ITEMS_SUCCESS = 'FETCH_ALL_ITEMS_SUCCESS';
export const FETCH_ALL_ITEMS_FAILURE = 'FETCH_ALL_ITEMS_FAILURE';

export const FETCH_ITEM_BY_ID_BEGIN = 'FETCH_ITEM_BY_ID_BEGIN';
export const FETCH_ITEM_BY_ID_SUCCESS = 'FETCH_ITEM_BY_ID_SUCCESS';
export const FETCH_ITEM_BY_ID_FAILURE = 'FETCH_ITEM_BY_ID_FAILURE';

export const DELETE_ITEM_BEGIN = 'DELETE_ITEM_BEGIN';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const UPDATE_ITEM_BEGIN = 'UPDATE_ITEM_BEGIN';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const ADD_ITEM_BEGIN = 'ADD_ITEM_BEGIN';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';


function fetchAllItemsBegin() {
    return {
        type: FETCH_ALL_ITEMS_BEGIN
    }
}

function fetchAllItemsSuccess(data) {
    return {
        type: FETCH_ALL_ITEMS_SUCCESS,
        data: data,
        receivedAt: Date.now()
    }
}

function fetchAllItemsFailure(error) {
    return {
        type: FETCH_ALL_ITEMS_FAILURE,
        error: error,
        receivedAt: Date.now()
    }
}

function addItemBegin() {
    return {
        type: ADD_ITEM_BEGIN
    }
}

function addItemSuccess(data) {
    return {
        type: ADD_ITEM_SUCCESS,
        data: data,
        receivedAt: Date.now()
    }
}

function addItemFailure(error) {
    return {
        type: ADD_ITEM_FAILURE,
        error: error,
        receivedAt: Date.now()
    }
}

// Functions ...
export function fetchAllItems() {
    return function (dispatch) {
        dispatch(fetchAllItemsBegin());

        // Fake server for dev
        if (process.env.NODE_ENV === "development") {
          return new Promise((res) => {
            res(dispatch(fetchAllItemsSuccess(fakeServer.fetchAllItems())));
          });
        }

        return fetch(env.api.url, {
                method: 'GET'
            })
            .then(
                response => response.json(),
                err => {
                  console.log('An error occurred.', err);
                  return dispatch(fetchAllItemsFailure(err));
                }
            )
            .then(data => {
                return dispatch(fetchAllItemsSuccess(data))
            })
            .catch((err) => {
                return dispatch(fetchAllItemsFailure(err));
            });

    }
}

export function addItem(name, status, comment, imageURL) {
  return function (dispatch) {
    dispatch(addItemBegin());

    // Fake server for dev
    if (process.env.NODE_ENV === "development") {
      return new Promise((res) => {
        res(dispatch(addItemSuccess(fakeServer.addItem(buildItem(
          name, status, comment, null
        )))));
      });
    }

    return fetch(env.api.url + "/new", {
              method: 'POST',
              body: JSON.stringify(buildItem(
                name, status, comment, null
              ))
          })
          .then(
              response => response.json(),
              err => {
                console.log('An error occurred.', err);
                return dispatch(addItemFailure(err));
              }
          )
          .then(data => {
              return dispatch(addItemSuccess(data))
          })
          .catch((err) => {
              return dispatch(addItemFailure(err));
          });
    }
}

function buildItem(name, status, comment ,imageURL) {
  return {
          name: name,
          status: status,
          comment: comment,
          imageURL: imageURL ? imageURL : "http://placekitten.com/200/200?image=5",
          dateAdded: new Date(),
          _id: `yourNewItemId${Math.random()}`
  };
}
