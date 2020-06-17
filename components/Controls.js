// React stuff
import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { vmax } from "react-native-expo-viewport-units";

// Redux stuff
import { connect } from "react-redux";
import {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  shuffleTracks,
  setCurrentPosition,
  setCurrentPositionWithTimer,
} from "../redux/mediaActions";

// Player's control elements
const Controls = ({
  playbackInstance,
  tracks,
  isPlaying,
  currentIndex,
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  shuffleTracks,
  currentPosition,
  setCurrentPosition,
  timerId,
  setCurrentPositionWithTimer,
}) => {
  async function _checkPlay () {
    if (timerId) clearTimeout(timerId);
    if (isPlaying) {
      setCurrentPositionWithTimer(0);
    } else {
      setCurrentPosition(0);
    }
    const { uri } = tracks[currentIndex];
    await loadAudio(uri, isPlaying);
  };

  const handlePlayPause = async () => {
    try {
      const currentPositionMilliseconds = currentPosition * 1000;

      if (isPlaying) {
        await playbackInstance.pauseAsync();
        if (timerId) clearTimeout(timerId);
      } else {
        await playbackInstance.playFromPositionAsync(
          currentPositionMilliseconds
        );
        setCurrentPositionWithTimer(currentPosition);
      }

      handlePlayPauseAction(isPlaying);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePreviousTrack = async () => {
    try {
      const amountOfTracks = tracks.length;

      if (playbackInstance) {
        await playbackInstance.unloadAsync();

        currentIndex > 0
          ? (currentIndex -= 1)
          : (currentIndex = amountOfTracks - 1);

        handleChangeTrackAction(currentIndex);
        _checkPlay();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleNextTrack = async () => {
    try {
      const amountOfTracks = tracks.length;

      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentIndex < amountOfTracks - 1
          ? (currentIndex += 1)
          : (currentIndex = 0);
        handleChangeTrackAction(currentIndex);
        _checkPlay();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleShuffleTracks = async () => {
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        for (let i = tracks.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
        }

        shuffleTracks(tracks);
        _checkPlay();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleReverseTracks = async () => {
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        tracks.reverse();
        shuffleTracks(tracks);
        _checkPlay();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShuffleTracks}>
        <SimpleLineIcons
          name="shuffle"
          size={vmax(5)}
          style={[styles.materialPicture, styles.previous]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePreviousTrack}>
        <MaterialIcons
          name="skip-previous"
          size={vmax(10)}
          style={[styles.materialPicture, styles.previous]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause}>
        {isPlaying ? (
          <MaterialIcons
            name="pause-circle-filled"
            size={vmax(10)}
            style={styles.materialPicture}
          />
        ) : (
          <MaterialIcons
            name="play-circle-filled"
            size={vmax(10)}
            style={styles.materialPicture}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNextTrack}>
        <MaterialIcons
          name="skip-next"
          size={vmax(10)}
          style={[styles.materialPicture, styles.next]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReverseTracks}>
        <SimpleLineIcons
          name="loop"
          size={vmax(5)}
          style={[styles.materialPicture, styles.next]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  materialPicture: {
    color: "#2f712f",
  },
  container: {
    flexDirection: "row",
    height: vmax(9),
    marginTop: vmax(1.5),
    alignItems: "center",
    justifyContent: "center",
  },

  previous: {
    marginRight: vmax(1),
  },

  next: {
    marginLeft: vmax(1),
  },
});

const mapActionsToProps = {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  shuffleTracks,
  setCurrentPosition,
  setCurrentPositionWithTimer,
};

Controls.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  tracks: PropTypes.array.isRequired,
  playbackInstance: PropTypes.object.isRequired,
  currentPosition: PropTypes.number.isRequired,
  timerId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentIndex: state.currentIndex,
  isPlaying: state.isPlaying,
  tracks: state.tracks,
  currentPosition: state.currentPosition,
  timerId: state.timerId,
});

export default connect(mapStateToProps, mapActionsToProps)(Controls);
