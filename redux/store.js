import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import mediaReducer from "./mediaReducer";

const initialState = {
  tracks: [],
  favoriteTracks: [],
  currentIndex: 0,
  currentPosition: 0,
  loading: true,
  loadingPlaybackInstance: false,
  isPlaying: false,
  playbackInstance: null,
  volume: 1.0,
  isBuffering: false,
  shuffledTimes: 0,
  timerId: null
};

const store = createStore(mediaReducer, initialState, applyMiddleware(thunk));

export default store;
