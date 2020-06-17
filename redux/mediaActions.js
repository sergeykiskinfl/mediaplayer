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
  SET_TIMER,
} from "./types";
import { Audio } from "expo-av";
import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-YOUR_DATABASE_URL.net/api";

export const setTracks = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });

    const res = await axios.get("/tracks/");

    const uri = res.data[0].uri;

    const playbackInstance = new Audio.Sound();

    const status = {
      shouldPlay: false,
    };

    const source = {
      uri: uri,
    };

    await playbackInstance.loadAsync(source, status, false);

    dispatch({ type: SET_PLAYBACKINSTANCE, payload: playbackInstance });
    dispatch({ type: SET_TRACKS, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOADING_FAILED, message: e.message });
  }
};

export const loadAudio = (uri, isPlaying) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_PLAYBACKINSTANCE });

    const playbackInstance = new Audio.Sound();

    const status = {
      shouldPlay: isPlaying,
    };

    const source = {
      uri: uri,
    };

    await playbackInstance.loadAsync(source, status, false);

    dispatch({ type: SET_PLAYBACKINSTANCE, payload: playbackInstance });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOADING_FAILED, message: e.message });
  }
};

export const handlePlayPauseAction = (isPlaying) => (dispatch) => {
  dispatch({ type: SET_PLAY, payload: !isPlaying });
};

export const handleChangeTrackAction = (currentIndex) => (dispatch) => {
  dispatch({ type: SET_CURRENT_INDEX, payload: currentIndex });
};

export const setCurrentPosition = (value) => (dispatch) => {
  dispatch({ type: SET_CURRENT_POSITIION, payload: value });
};

export const setPhoneOrientation = (value) => (dispatch) => {
  dispatch({ type: SET_PHONE_ORIENTATION, payload: value });
};

export const shuffleTracks = (value) => (dispatch) => {
  dispatch({ type: SHUFFLE_TRACKS, payload: value });
};

export const setTimer = (value) => (dispatch) => {
  dispatch({ type: SET_TIMER, payload: value });
};

// Seekbar slider's current position, while playing tracks
export const setCurrentPositionWithTimer = (value) => (dispatch) => {
  const timerId = setInterval(() => {
    value += 1;
    dispatch({ type: SET_CURRENT_POSITIION, payload: value });
  }, 1000);

  dispatch({ type: SET_TIMER, payload: timerId });
};
