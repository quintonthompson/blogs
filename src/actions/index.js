import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //initiate asynchronous over to the api get posts
  await dispatch(fetchPosts());

  //----------------- without chaining -------------------------//
  // const userIds = _.uniq(_.map(getState().posts, "userId")); //
  // userIds.forEach(id => dispatch(fetchUser(id)));            //
  //------------------------------------------------------------//

  // the above code with chaining

  //return array of unique ids, should be only 10
  //for each id in the array, dispatch the fetchUser function
  //We dont care to wait for user ids to be loaded so no need for await
  _.chain(getState().posts) //get state of posts
    .map("userId") //map userId
    .uniq() //map userId to unique id
    .forEach(id => dispatch(fetchUser(id))) //for each unique id fetch user and dispatch
    .value(); //must have .value() at the end of chaining for it to be executed
};

//fetchposts is a function that returns a function that returns a response object
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
