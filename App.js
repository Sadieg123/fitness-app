// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@rneui/themed';
import { registerRootComponent } from 'expo';
import React from 'react';
import 'react-native-gesture-handler';

import DurationExercise from './screens/DurationExercise';
import Home from './screens/Home';
import RepetitionExercise from './screens/RepetitionExercise';

const Stack = createStackNavigator();

const theme = {
  lightColors: { primary: '#7c6fff' },
  darkColors: { primary: '#7c6fff' },
  mode: 'dark',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a2e',
              shadowColor: 'transparent',
              elevation: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#2a2a4a',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: '800',
              fontSize: 18,
              letterSpacing: 0.5,
            },
            headerBackTitleVisible: false,
            cardStyle: { backgroundColor: '#0f0f1a' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: '🏋️ FitTracker', headerLeft: null }}
          />
          <Stack.Screen
            name="RepetitionExercise"
            component={RepetitionExercise}
            options={({ route }) => ({
              title: route.params?.exercise?.title || 'Exercise',
            })}
          />
          <Stack.Screen
            name="DurationExercise"
            component={DurationExercise}
            options={({ route }) => ({
              title: route.params?.exercise?.title || 'Exercise',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

registerRootComponent(App);