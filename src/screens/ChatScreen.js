import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listConversations } from "../graphql/queries";
import { createMessage } from "../graphql/mutations";
import { onCreateMessage } from "../graphql/subscriptions";

import * as messageActions from "../store/actions/message";

const ChatScreen = ({}) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { userId, userName, conversationId } = useSelector(
    (state) => state.auth
  );
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    const fetchMessages = async () => {
      // GraphQL Query
      const filter = {
        id: {
          eq: conversationId,
        },
      };
      const fetchedMessages = await API.graphql(
        graphqlOperation(listConversations, { filter })
      );
      const fetchedMessages_ = fetchedMessages.data.listConversations.items[0].messages.items.map(
        (message) => {
          return {
            id: message.id,
            body: message.body,
            messageOwnerUsername: message.messageOwnerUsername,
            messageOwnerId: message.messageOwnerId,
            createdAt: message.createdAt,
            attachment: message.attachment,
          };
        }
      );
      // Redux 追加
      await dispatch(messageActions.setMessage(fetchedMessages_));
    };
    fetchMessages();

    const createMessageListner = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (messageData) => {
        const newMessage = messageData.value.data.onCreateMessage; // newly created Message
        dispatch(
          messageActions.addMessage(
            newMessage.body,
            newMessage.messageOwnerUsername,
            newMessage.createdAt,
            newMessage.attachment
          )
        );
      },
    });

    return () => {
      createMessageListner.unsubscribe();
    };
  }, []);

  const handleAddMessage = async () => {
    setIsSending(true);
    const input = {
      body: body,
      messageOwnerId: userId,
      messageOwnerUsername: userName,
      messageConversationIdId: conversationId,
    };
    const message = await API.graphql(
      graphqlOperation(createMessage, { input })
    );
    setBody("");
    setIsSending(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.sort(
          (a, b) => new Date(a.createdAt) > new Date(b.createdAt)
        )}
        renderItem={(element) => {
          return (
            <Text>
              {element.item.body} by {element.item.messageOwnerUsername} posted
              at {element.item.createdAt}
            </Text>
          );
        }}
        keyExtractor={(element) => element.createdAt}
      />
      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          value={body}
          onChangeText={(text) => setBody(text)}
        />
        <Button
          disabled={isSending ? true : false}
          title="送信"
          onPress={handleAddMessage}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {},
  input: {
    width: "80%",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    marginRight: 5,
  },
  inputForm: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
