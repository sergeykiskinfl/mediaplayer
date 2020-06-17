import {
  LOADING_DATA,
  SET_TRACKS,
  LOADING_FAILED,
  LOADING_PLAYBACKINSTANCE,
  SET_PLAYBACKINSTANCE,
  SET_PLAY,
  SET_CURRENT_INDEX,
  SET_CURRENT_POSITIION,
  SET_PHONE_ORIENTATION,
  SHUFFLE_TRACKS,
  SET_TIMER
} from "./types";

export default function (state, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        loading: false,
      };
    case LOADING_FAILED:
      return {
        ...state,
        message: action.message,
        loading: false,
      };
    case LOADING_PLAYBACKINSTANCE:
      return {
        ...state,
        loadingPlaybackInstance: true,
      };
    case SET_PLAYBACKINSTANCE:
      return {
        ...state,
        playbackInstance: action.payload,
        loadingPlaybackInstance: false,
      };
    case SET_PLAY:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload,
      };
    case SET_CURRENT_POSITIION:
      return {
        ...state,
        currentPosition: action.payload,
      };
    case SET_PHONE_ORIENTATION:
      return {
        ...state,
        phoneOrientation: action.payload,
      };
    case SHUFFLE_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        shuffledTimes: state.shuffledTimes+1
      };
    case SET_TIMER:
      return {
        ...state,
        timerId: action.payload
      }
    default:
      return state;
  }
}
