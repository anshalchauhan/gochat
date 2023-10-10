import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  voiceCall: undefined,
  videoCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setVoiceCall(state, action) {
      return {
        ...state,
        voiceCall: action.payload.voiceCall,
      };
    },
    setVideoCall(state, action) {
      return {
        ...state,
        videoCall: action.payload.videoCall,
      };
    },
    endCall(state, action) {
      return {
        ...state,
        voiceCall: undefined,
        videoCall: undefined,
        incomingVoiceCall: undefined,
        incomingVideoCall: undefined,
      };
    },
    setIncomingVoiceCall(state, action) {
      return {
        ...state,
        incomingVoiceCall: action.payload.incomingVoiceCall,
      };
    },
    setIncomingVideoCall(state, action) {
      return {
        ...state,
        incomingVideoCall: action.payload.incomingVideoCall,
      };
    },
  },
});

export default callSlice.reducer;

export const {
  setVoiceCall,
  setVideoCall,
  endCall,
  setIncomingVoiceCall,
  setIncomingVideoCall,
} = callSlice.actions;
