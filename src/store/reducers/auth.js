import {
  LOGIN,
  LOGOUT,
  CHANGE_COLOR,
  SET_CONVERSATION_ID,
} from "../actions/auth";

const initialState = {
  userId: null,
  userName: null,
  themeColor: null,
  conversationId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        userId: action.userId,
        userName: action.username,
        themeColor: action.themeColor,
        conversationId: action.conversationId,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    case CHANGE_COLOR:
      return {
        ...initialState,
        themeColor: action.color,
      };

    case SET_CONVERSATION_ID:
      return {
        ...initialState,
        conversationId: action.conversationId,
      };

    default:
      return state;
  }
};
