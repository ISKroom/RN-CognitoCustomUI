/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
      id
      userIds
      messages {
        items {
          id
          messageOwnerId
          messageOwnerUsername
          createdAt
          body
          attachment
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation(
    $input: UpdateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    updateConversation(input: $input, condition: $condition) {
      id
      userIds
      messages {
        items {
          id
          messageOwnerId
          messageOwnerUsername
          createdAt
          body
          attachment
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation(
    $input: DeleteConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    deleteConversation(input: $input, condition: $condition) {
      id
      userIds
      messages {
        items {
          id
          messageOwnerId
          messageOwnerUsername
          createdAt
          body
          attachment
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      conversationId {
        id
        userIds
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      messageOwnerId
      messageOwnerUsername
      createdAt
      body
      attachment
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      conversationId {
        id
        userIds
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      messageOwnerId
      messageOwnerUsername
      createdAt
      body
      attachment
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      conversationId {
        id
        userIds
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      messageOwnerId
      messageOwnerUsername
      createdAt
      body
      attachment
      updatedAt
    }
  }
`;
