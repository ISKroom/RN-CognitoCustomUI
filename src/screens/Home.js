import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createConversation } from "../graphql/mutations";

import Colors from "../constants/Colors";
import Const from "../constants/Const";

import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

export default function Home({ updateAuthState, navigation }) {
  const [isChangingState, setIsChangingState] = useState(false);
  const themeColor = useSelector((state) => state.auth.themeColor);
  const dispatch = useDispatch();

  const styles = getStyles(themeColor);

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("LOGGEDOUT");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  useEffect(() => {
    const updateStoreAndCheckConversationId = async () => {
      // ユーザー情報を取得
      const user = await Auth.currentAuthenticatedUser();

      // LOGIN アクションで Redux store を更新
      // 本当は一個前のスクリーンでやったほうがいいね
      // なぜならこの処理をしてる間は themeColor が null になってしまうから
      await dispatch(
        authActions.login(
          user.attributes.sub,
          user.username,
          user.attributes["custom:themeColor"],
          user.attributes["custom:conversationId"]
        )
      );

      // conversationId を取得
      let conversationId = user.attributes["custom:conversationId"];
      // まだconversationIdが存在しない場合は新規生成する
      if (!conversationId) {
        try {
          // MutationでDynamoDB内のConversationIdを更新
          const input = {
            userIds: [user.attributes.sub, Const.supportId],
          };
          const conversation = await API.graphql(
            graphqlOperation(createConversation, { input })
          );

          // バックエンドで生成された conversationId を取得
          conversationId = conversation.data.createConversation.id;

          // Cognito内のユーザー情報を更新
          await Auth.updateUserAttributes(user, {
            "custom:conversationId": conversationId,
          });

          // Reduxのstoreを更新
          await dispatch(authActions.setConversationId(conversationId));
        } catch (e) {
          console.log(e);
        }
      }
    };
    updateStoreAndCheckConversationId();
  }, []);

  const changeThemeColorHandler = async (color) => {
    setIsChangingState(true);
    let user = await Auth.currentAuthenticatedUser();
    let result = await Auth.updateUserAttributes(user, {
      "custom:themeColor": color,
    });
    await dispatch(authActions.changeColor(color));
    setIsChangingState(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <View style={styles.buttonContainer}>
        <Button
          title="Default Color"
          disabled={isChangingState ? true : false}
          color={Colors.defaultColor}
          onPress={() => changeThemeColorHandler("defaultColor")}
        />
        <Button
          title="Second Color"
          disabled={isChangingState ? true : false}
          color={Colors.secondColor}
          onPress={() => changeThemeColorHandler("secondColor")}
        />
      </View>
      <View style={styles.testBox} />
      <View style={styles.chatButton}>
        <Button
          title="Chat Page"
          color="tomato"
          onPress={() => navigation.navigate("Chat")}
        />
      </View>
    </View>
  );
}

// stateにアクセスするために引数にstateをつっこみました
const getStyles = (themeColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      width: "80%",
      justifyContent: "space-between",
      marginTop: 20,
    },
    testBox: {
      marginTop: 20,
      width: 200,
      height: 30,
      backgroundColor: Colors[themeColor],
    },
    chatButton: {
      marginTop: 20,
    },
  });
