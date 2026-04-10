// screens/RepetitionExercise.js
import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const RepetitionExercise = ({ route, navigation }) => {
  const { exercise, allExercises } = route.params;
  const [count, setCount] = useState(0);
  const [sets, setSets] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  const reset = () => {
    if (count > 0) {
      Alert.alert(
        'Complete Set?',
        `Log ${count} reps as a completed set?`,
        [
          {
            text: 'Just Reset',
            onPress: () => setCount(0),
            style: 'cancel',
          },
          {
            text: 'Log Set ✓',
            onPress: () => {
              setSets((prev) => prev + 1);
              setCount(0);
            },
          },
        ]
      );
    } else {
      setSets(0);
    }
  };

  const goToSuggested = () => {
    const suggested = allExercises.find(
      (e) => e.id === exercise.suggestedExercise.id
    );
    if (suggested) {
      if (suggested.type === 'repetition') {
        navigation.navigate('RepetitionExercise', {
          exercise: suggested,
          allExercises,
        });
      } else {
        navigation.navigate('DurationExercise', {
          exercise: suggested,
          allExercises,
        });
      }
    }
  };

  const goHome = () => {
    navigation.navigate('Home');
  };

  const progress = Math.min(count / exercise.suggestedCount, 1);
  const progressPercent = Math.round(progress * 100);

  return (
    <SafeAreaView style={styles.container}>
      {/* Exercise Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>{exercise.emoji}</Text>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.description}>{exercise.description}</Text>
        <View style={styles.goalBadge}>
          <Text style={styles.goalText}>
            🎯 Goal: {exercise.suggestedCount} reps
          </Text>
        </View>
      </View>

      {/* Counter Display */}
      <View style={styles.counterContainer}>
        <View style={styles.setsRow}>
          <Text style={styles.setsText}>Sets Completed: </Text>
          <Text style={styles.setsNumber}>{sets}</Text>
        </View>

        <View style={styles.countCircle}>
          <Text style={styles.countNumber}>{count}</Text>
          <Text style={styles.countLabel}>REPS</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {progressPercent}% of goal ({exercise.suggestedCount} reps)
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title={`+ Rep`}
          onPress={increment}
          buttonStyle={styles.incrementButton}
          titleStyle={styles.incrementTitle}
          containerStyle={styles.incrementContainer}
        />

        <Button
          title="Reset / Log Set"
          onPress={reset}
          buttonStyle={styles.resetButton}
          titleStyle={styles.resetTitle}
          containerStyle={styles.halfButton}
          type="outline"
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navSection}>
        <Text style={styles.navSectionTitle}>Next Up</Text>
        <Button
          title={`Try: ${exercise.suggestedExercise.title} →`}
          onPress={goToSuggested}
          buttonStyle={styles.suggestedButton}
          titleStyle={styles.suggestedTitle}
          containerStyle={styles.fullButton}
        />

        <Button
          title="🏠 Back to Home"
          onPress={goHome}
          buttonStyle={styles.homeButton}
          titleStyle={styles.homeTitle}
          containerStyle={styles.fullButton}
          type="outline"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#8888aa',
    marginTop: 4,
    textAlign: 'center',
  },
  goalBadge: {
    marginTop: 10,
    backgroundColor: '#2a2a4a',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3d2b7a',
  },
  goalText: {
    color: '#a888ff',
    fontWeight: '600',
    fontSize: 13,
  },
  counterContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  setsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  setsText: {
    color: '#8888aa',
    fontSize: 16,
  },
  setsNumber: {
    color: '#7c6fff',
    fontSize: 22,
    fontWeight: '800',
  },
  countCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#1a1a2e',
    borderWidth: 4,
    borderColor: '#7c6fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#7c6fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  countNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: '#ffffff',
  },
  countLabel: {
    fontSize: 12,
    color: '#8888aa',
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: -8,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#2a2a4a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7c6fff',
    borderRadius: 4,
  },
  progressText: {
    color: '#8888aa',
    fontSize: 12,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  incrementContainer: {
    borderRadius: 16,
  },
  incrementButton: {
    backgroundColor: '#7c6fff',
    paddingVertical: 20,
    borderRadius: 16,
  },
  incrementTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  halfButton: {
    borderRadius: 16,
  },
  resetButton: {
    borderColor: '#5a3fa8',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
  },
  resetTitle: {
    color: '#a888ff',
    fontSize: 16,
    fontWeight: '600',
  },
  navSection: {
    gap: 10,
  },
  navSectionTitle: {
    fontSize: 12,
    color: '#8888aa',
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  fullButton: {
    borderRadius: 14,
  },
  suggestedButton: {
    backgroundColor: '#1a3a5c',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a5a8c',
  },
  suggestedTitle: {
    color: '#5ac8fa',
    fontSize: 15,
    fontWeight: '700',
  },
  homeButton: {
    borderColor: '#2a2a4a',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 2,
  },
  homeTitle: {
    color: '#8888aa',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default RepetitionExercise;