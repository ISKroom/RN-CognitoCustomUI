export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const CHANGE_COLOR = "CHANGE_COLOR";
export const SET_CONVERSATION_ID = "SET_CONVERSATION_ID";

export const login = (userId, username, themeColor, conversationId) => {
  return {
    type: LOGIN,
    userId: userId,
    username: username,
    themeColor: themeColor,
    conversationId: conversationId,
  };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const changeColor = (color) => {
  return { type: CHANGE_COLOR, color: color };
};

export const setConversationId = (conversationId) => {
  return { type: SET_CONVERSATION_ID, conversationId: conversationId };
};
