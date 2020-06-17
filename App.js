// React stuff
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

// Redux stuff
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/Home";
import Player from "./components/Player";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "#2f712f",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            },
          }}
        >
          <Stack.Screen
            name="Playlist"
            component={Home}
            options={{
              title: "Playlist",
            }}
          />
          <Stack.Screen
            name="MediaPlayer"
            component={Player}
            options={{
              title: "MediaPlayer",
              headerRight: () => (<View />)
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
