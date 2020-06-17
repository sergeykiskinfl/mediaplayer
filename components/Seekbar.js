// React stuff
import React from "react";
import { Slider } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import { vmax } from "react-native-expo-viewport-units";

// Redux stuff
import { connect } from "react-redux";
import {
  setCurrentPosition,
  handlePlayPauseAction,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  loadAudio
} from "../redux/mediaActions";

// Seekbar slider
export const Seekbar = ({
  tracks,
  currentIndex,
  currentPosition,
  setCurrentPosition,
  isPlaying,
  playbackInstance,
  timerId,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  loadAudio
}) => {
  const { duration } = tracks[currentIndex];

  let sliderValue = Math.round((currentPosition / duration) * 100) / 100;

  React.useEffect(() => {
    async function handleNextTrack() {
      try {
        const amountOfTracks = tracks.length;

        if (playbackInstance) {
          await playbackInstance.unloadAsync();
          currentIndex < amountOfTracks - 1
            ? (currentIndex += 1)
            : (currentIndex = 0);
          if (timerId) clearTimeout(timerId);
          if (isPlaying) {
            setCurrentPositionWithTimer(0);
          } else {
            setCurrentPosition(0);
          }
          handleChangeTrackAction(currentIndex);
          const { uri } = tracks[currentIndex];

          await loadAudio(uri, isPlaying);
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (currentPosition >= duration) handleNextTrack();
  }, [currentPosition]);

  function _pad(n, width, z = 0) {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  const minutesAndSeconds = (position) => [
    _pad(Math.floor(position / 60), 2),
    _pad(position % 60, 2),
  ];

  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(duration - currentPosition);

  const onSlidingStart = async () => {
    if (timerId) clearTimeout(timerId);
  };

  const onSeek = async () => {
    const currentPositionMilliseconds = currentPosition * 1000;

    if (isPlaying) {
      await playbackInstance.playFromPositionAsync(currentPositionMilliseconds);
      setCurrentPositionWithTimer(currentPosition);
    } else {
      setCurrentPosition(currentPosition);
    }
  };

  const onValueChange = async (value) => {
    const currentPosition = Math.floor(duration * value);
    setCurrentPosition(currentPosition);
  };

  return (
    <View style={styles.container}>
      <View style={styles.durationInfo}>
        <Text>{elapsed[0] + ":" + elapsed[1]}</Text>
        <View style={styles.placeholder}></View>
        <Text>{duration > 1 && "-" + remaining[0] + ":" + remaining[1]}</Text>
      </View>
      <Slider
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        onValueChange={onValueChange}
        thumbTintColor="#2f712f"
        trackStyle={styles.trackStyleSlider}
        value={sliderValue}
        minimumTrackTintColor="#1e481e"
        maximumTrackTintColor="#7cbd7c"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: vmax(2),
  },
  durationInfo: {
    flexDirection: "row",
  },
  placeholder: {
    flex: 1,
  },
});

const mapActionsToProps = {
  setCurrentPosition,
  handlePlayPauseAction,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  loadAudio,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentPosition: state.currentPosition,
  isPlaying: state.isPlaying,
  tracks: state.tracks,
  currentIndex: state.currentIndex,
  timerId: state.timerId,
});

export default connect(mapStateToProps, mapActionsToProps)(Seekbar);
