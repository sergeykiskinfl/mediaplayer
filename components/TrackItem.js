// React stuff
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { vmax } from "react-native-expo-viewport-units";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import PulseCircle from "./PulseCircle";

// Redux stuff
import { connect } from "react-redux";
import {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  setCurrentPositionWithTimer
} from "../redux/mediaActions";

const TrackItem = ({
  playbackInstance,
  track,
  isPlaying,
  index,
  timerId,
  currentIndex,
  currentPosition,
  loadAudio,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  handlePlayPauseAction,
}) => {
  const { uri, imageSource, title, author, durationText } = track;

  const handlePlayPause = async () => {
    try {
      if (playbackInstance) {
        const currentPositionMilliseconds = currentPosition * 1000;

        if (index == currentIndex) {
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
        } else {
          await playbackInstance.unloadAsync();
          if (timerId) clearTimeout(timerId);
          handleChangeTrackAction(index);
          handlePlayPauseAction(false);
          await loadAudio(uri, true);
          setCurrentPositionWithTimer(0);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const imageTrackItem =
    index != currentIndex ? (
      <Image
        style={styles.albumCover}
        source={{
          uri: imageSource,
        }}
      />
    ) : isPlaying ? (
      <ImageBackground
        style={styles.albumCover}
        imageStyle={styles.imageBackgroundStyle}
        source={{
          uri: imageSource,
        }}
      >
        <PulseCircle />
      </ImageBackground>
    ) : (
      <ImageBackground
        style={styles.albumCover}
        imageStyle={styles.imageBackgroundStyle}
        source={{
          uri: imageSource,
        }}
      >
        <MaterialIcons
          name="play-arrow"
          size={vmax(8)}
          style={styles.materialPicture}
        />
      </ImageBackground>
    );

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={handlePlayPause}>
        {imageTrackItem}
        <View style={styles.info}>
          <Text style={styles.authorTitle}>{author}</Text>
          <Text style={styles.trackTitle}>{title}</Text>
        </View>
        <Text style={styles.durationText}>{durationText}</Text>
      </TouchableOpacity>
      <View style={styles.separator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  albumCover: {
    width: vmax(8),
    height: vmax(8),
    marginLeft: vmax(1),
    opacity: 1,
  },

  trackTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1e481e",
  },

  authorTitle: {
    fontSize: 12,
  },

  info: {
    flex: 1,
    alignItems: "center",
  },

  durationText: {
    paddingRight: vmax(2),
  },

  separator: {
    margin: 1.5,
    borderWidth: 0.5,
  },

  materialPicture: {
    color: "#2f712f",
    opacity: 1,
  },

  imageBackgroundStyle: {
    opacity: 0.5,
  },
});

TrackItem.propTypes = {
  track: PropTypes.object.isRequired,
  playbackInstance: PropTypes.object,
  index: PropTypes.number.isRequired,
  timerId: PropTypes.number,
  currentIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentPosition: PropTypes.number.isRequired,
};

const mapActionsToProps = {
  loadAudio,
  handleChangeTrackAction,
  handlePlayPauseAction,
  setCurrentPositionWithTimer,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  isPlaying: state.isPlaying,
  timerId: state.timerId,
  currentIndex: state.currentIndex,
  currentPosition: state.currentPosition,
});

export default connect(mapStateToProps, mapActionsToProps)(TrackItem);
