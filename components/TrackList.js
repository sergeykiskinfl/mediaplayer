// React stuff
import * as React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { vmax } from "react-native-expo-viewport-units";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";

import TrackItem from "./TrackItem";
import MiniPlayer from "./MiniPlayer";

const TrackList = ({ tracks, currentIndex, shuffledTimes }) => {
  React.useEffect(() => {
    // console.log("TrackList useEffect shuffledTimes :>> ", shuffledTimes);
  }, [shuffledTimes]);

  const { album } = tracks[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.albumTitle}>{album}</Text>

      <View style={styles.tracklist}>
        <FlatList
          data={tracks}
          renderItem={({ item, index }) => (
            <TrackItem track={item} index={index} />
          )}
        />
      </View>
      <MiniPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  albumTitle: {
    marginTop: vmax(2),
    marginBottom: vmax(2),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  tracklist: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  miniPlayer: {
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  currentIndex: state.currentIndex,
  isPlaying: state.isPlaying,
  shuffledTimes: state.shuffledTimes,
});

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  shuffledTimes: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(TrackList);
