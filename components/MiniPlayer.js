// React stuff
import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import { vmax } from "react-native-expo-viewport-units";
import { useNavigation } from "@react-navigation/native";

// Redux stuff
import { connect } from "react-redux";

// Player's link in the home screen
const MiniPlayer = ({ tracks, currentIndex, isPlaying, shuffledTimes }) => {
  React.useEffect(() => {
    // console.log("TrackList useEffect shuffledTimes :>> ", shuffledTimes);
  }, [shuffledTimes]);
  const { title, author } = tracks[currentIndex];
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("MediaPlayer")}
      >
        {isPlaying ? (
          <MaterialIcons
            name="pause-circle-filled"
            size={vmax(8)}
            style={styles.materialPicture}
          />
        ) : (
          <MaterialIcons
            name="play-circle-filled"
            size={vmax(8)}
            style={styles.materialPicture}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.authorTitle}>{author}</Text>
          <Text style={styles.trackTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    flex: 1,
    alignItems: "center",
  },

  trackTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1e481e",
  },

  authorTitle: {
    fontSize: 12,
  },

  materialPicture: {
    color: "#2f712f",
    paddingLeft: vmax(1),
  },
});

MiniPlayer.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  tracks: PropTypes.array.isRequired,
  shuffledTimes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  currentIndex: state.currentIndex,
  isPlaying: state.isPlaying,
  shuffledTimes: state.shuffledTimes,
});

export default connect(mapStateToProps)(MiniPlayer);
