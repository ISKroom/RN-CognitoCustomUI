import { ADD_MESSAGE, SET_MESSAGE } from "../actions/message";

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        messages: action.messages,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat({
          body: action.body,
          messageOwnerUsername: action.username,
          createdAt: action.createdAt,
          attachment: action.attachment,
        }),
      };
  }
  return state;
};
