import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import Amplify, { Auth } from "aws-amplify";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import ConfirmSignUp from "./src/screens/ConfirmSignUp";
import Home from "./src/screens/Home";
import ChatScreen from "./src/screens/ChatScreen";

import authReducer from "./src/store/reducers/auth";
import messageReducer from "./src/store/reducers/message";
import config from "./src/aws-exports";

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = (props) => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {(screenProps) => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};

const AppStack = createStackNavigator();
const AppNavigator = (props) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {(screenProps) => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>

      <AppStack.Screen name="Chat">
        {(screenProps) => <ChatScreen {...screenProps} />}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

// スピンローダー
const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState("INITIALIZING");

  async function checkAuthState() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUserLoggedIn("LOGGEDIN");
    } catch (err) {
      setUserLoggedIn("LOGGEDOUT");
    }
  }

  useEffect(() => {
    checkAuthState();
  }, []);

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        {isUserLoggedIn === "INITIALIZING" && <Initializing />}
        {isUserLoggedIn === "LOGGEDIN" && (
          <AppNavigator updateAuthState={updateAuthState} />
        )}
        {isUserLoggedIn === "LOGGEDOUT" && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </Provider>
    </NavigationContainer>
  );
}

export default App;
