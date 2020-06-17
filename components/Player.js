// React stuff
import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { vmax } from "react-native-expo-viewport-units";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";

import Controls from "./Controls";
import Seekbar from "./Seekbar";

// Player's screen
const Player = ({ tracks, currentIndex, phoneOrientation, shuffledTimes }) => {
  const { imageSource, album, title, author } = tracks[currentIndex];

  return (
    <View
      style={
        phoneOrientation == 1 || phoneOrientation == 2
          ? styles.container
          : styles.containerLandscape
      }
    >
      <View>
        <Text style={styles.albumTitle}>{album}</Text>
        <View style={styles.albumContainer}>
          <Image
            style={
              phoneOrientation == 1 || phoneOrientation == 2
                ? styles.albumCover
                : styles.albumCoverLandscape
            }
            source={{
              uri: imageSource,
            }}
          />
        </View>
      </View>
      <View>
        <View style={styles.textInfo}>
          <Text style={styles.trackTitle}>{title}</Text>
          <Text style={styles.authorTitle}>{author}</Text>
        </View>
        <View>
          <Seekbar />
        </View>
        <View>
          <Controls />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  containerLandscape: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  albumTitle: {
    marginVertical: vmax(1),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  containerControl: {
    flex: 1,
  },

  albumCover: {
    width: vmax(50),
    height: vmax(50),
  },

  albumContainer: {
    alignItems: "center",
  },

  albumCoverLandscape: {
    width: vmax(32),
    height: vmax(32),
  },

  textInfo: {
    alignItems: "center",
    justifyContent: "center",
  },

  trackTitle: {
    marginTop: vmax(1),
    fontWeight: "bold",
    fontSize: 20,
    color: "#1e481e",
  },

  authorTitle: {
    fontSize: 16,
  },
});

Player.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  tracks: PropTypes.array.isRequired,
  phoneOrientation: PropTypes.number,
  shuffledTimes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  currentIndex: state.currentIndex,
  phoneOrientation: state.phoneOrientation,
  shuffledTimes: state.shuffledTimes,
});

export default connect(mapStateToProps)(Player);
