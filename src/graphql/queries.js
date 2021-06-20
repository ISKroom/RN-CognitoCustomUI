/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
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
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        conversationId {
          id
          userIds
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
      nextToken
    }
  }
`;
