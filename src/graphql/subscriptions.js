/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation {
    onCreateConversation {
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation {
    onUpdateConversation {
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation {
    onDeleteConversation {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
