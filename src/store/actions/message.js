export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGE = "SET_MESSAGE";

export const addMessage = (body, username, createdAt, attachment) => {
  return { type: ADD_MESSAGE, body, username, createdAt, attachment };
};

export const setMessage = (messages) => {
  console.log(messages);
  return { type: SET_MESSAGE, messages };
};
