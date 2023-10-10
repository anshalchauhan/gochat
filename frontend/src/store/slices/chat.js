import { createSlice } from "@reduxjs/toolkit";

const userId = window.localStorage.getItem("userId");

const initialState = {
  singleChat: {
    conversations: [],
    currentConversation: null,
    currentMessages: [],
    error: null,
    isLoading: false,
  },
  groupChat: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchSingleChatConversations(state, action) {
      const list = action.payload.conversations.map((element) => {
        const thisUser = element.participants.find(
          (element) => element._id.toString() !== userId
        );

        let lastMessage = "No Messages Yet";
        let time = null;

        if (element.messages.length !== 0) {
          const { text, createdAt } =
            element.messages[element.messages.length - 1];
          lastMessage = text;
          time = new Date(createdAt);
          time = time.toString();
          time = time.slice(16, 21);
        }

        return {
          id: element._id,
          userId: thisUser._id,
          name: `${thisUser.firstName} ${thisUser.lastName}`,
          online: thisUser.status === "Online",
          img: thisUser.avatar,
          msg: thisUser.about,
          lastMessage,
          time,
          unread: 0,
          pinned: false,
        };
      });

      state.singleChat.conversations = list;
    },

    updateSingleChatConversations(state, action) {
      const thisConversations = action.payload.conversations;
      state.singleChat.conversations = state.singleChat.conversations.map(
        (element) => {
          if (element?.id !== thisConversations._id) {
            return element;
          } else {
            const thisUser = thisConversations.participants.find(
              (element) => element?._id.toString() !== userId
            );

            return {
              id: thisConversations?._id,
              userId: thisUser?._id,
              name: `${thisUser?.firstName} ${thisUser?.lastName}`,
              online: thisUser?.status === "Online",
              img: thisUser.avatar,
              msg: thisUser.about,
              time: "9:36",
              unread: 0,
              pinned: false,
            };
          }
        }
      );
    },

    addSingleChatConversations(state, action) {
      const thisConversations = action.payload.conversations;

      const thisUser = thisConversations.participants.find(
        (element) => element._id.toString() !== userId
      );

      // to prevent adding same conversation 2 times
      state.singleChat.conversations = state.singleChat.conversations.filter(
        (element) => element?.id !== thisConversations._id
      );

      state.singleChat.conversations.push({
        id: thisConversations?._id,
        userId: thisUser?._id,
        name: `${thisUser?.firstName} ${thisUser?.lastName}`,
        online: thisUser?.status === "Online",
        img: thisUser.avatar,
        msg: thisUser.about,
        time: "9:36",
        unread: 0,
        pinned: false,
      });
    },

    setSingleChatCurrentConversations(state, action) {
      state.singleChat.currentConversation = action.payload;
    },

    fetchSingleChatCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formattedMessages = messages.map((element) => ({
        id: element._id,
        type: "msg",
        subtype: element.type,
        message: element.text,
        incoming: element.to === userId,
        outgoing: element.from === userId,
      }));

      state.singleChat.currentMessages = formattedMessages;
    },

    addSingleChatMessage(state, action) {
      state.singleChat.currentMessages.push(action.payload);
    },
  },
});

export default chatSlice.reducer;
export const {
  fetchSingleChatConversations,
  updateSingleChatConversations,
  addSingleChatConversations,
  setSingleChatCurrentConversations,
  fetchSingleChatCurrentMessages,
  addSingleChatMessage,
} = chatSlice.actions;
