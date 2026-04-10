// screens/DurationExercise.js
import { Button } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const DurationExercise = ({ route, navigation }) => {
  const { exercise, allExercises } = route.params;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedRounds, setCompletedRounds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Auto-alert when goal is reached
  useEffect(() => {
    if (seconds === exercise.suggestedDuration && isRunning) {
      setIsRunning(false);
      Alert.alert(
        '🎉 Goal Reached!',
        `You held ${exercise.title} for ${exercise.suggestedDuration} seconds!`,
        [
          {
            text: 'Log & Reset',
            onPress: () => {
              setCompletedRounds((prev) => prev + 1);
              setSeconds(0);
            },
          },
          { text: 'Keep Going!', onPress: () => setIsRunning(true) },
        ]
      );
    }
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    if (seconds > 0) {
      Alert.alert('Reset Timer?', 'Do you want to reset your progress?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log & Reset',
          onPress: () => {
            setIsRunning(false);
            setCompletedRounds((prev) => prev + 1);
            setSeconds(0);
          },
        },
        {
          text: 'Just Reset',
          onPress: () => {
            setIsRunning(false);
            setSeconds(0);
          },
          style: 'destructive',
        },
      ]);
    } else {
      setCompletedRounds(0);
    }
  };

  const goToSuggested = () => {
    setIsRunning(false);
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
    setIsRunning(false);
    navigation.navigate('Home');
  };

  const progress = Math.min(seconds / exercise.suggestedDuration, 1);
  const progressPercent = Math.round(progress * 100);
  const circumference = 2 * Math.PI * 72; // For the circular progress concept
  const isGoalReached = seconds >= exercise.suggestedDuration;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>{exercise.emoji}</Text>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.description}>{exercise.description}</Text>
        <View style={styles.goalBadge}>
          <Text style={styles.goalText}>
            🎯 Goal: {exercise.suggestedDuration}s
          </Text>
        </View>
      </View>

      {/* Timer Display */}
      <View style={styles.timerSection}>
        <View style={styles.roundsRow}>
          <Text style={styles.roundsText}>Rounds Done: </Text>
          <Text style={styles.roundsNumber}>{completedRounds}</Text>
        </View>

        <View
          style={[
            styles.timerCircle,
            isGoalReached && styles.timerCircleSuccess,
            isRunning && styles.timerCircleActive,
          ]}
        >
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          <Text style={styles.timerLabel}>
            {isRunning ? 'RUNNING' : seconds === 0 ? 'READY' : 'PAUSED'}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progressPercent}%` },
              isGoalReached && styles.progressBarSuccess,
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {seconds}s / {exercise.suggestedDuration}s goal ({progressPercent}%)
        </Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title={isRunning ? '⏸  Pause' : seconds === 0 ? '▶  Start Timer' : '▶  Resume'}
          onPress={handleStartStop}
          buttonStyle={[
            styles.startButton,
            isRunning && styles.pauseButton,
          ]}
          titleStyle={styles.startTitle}
          containerStyle={styles.fullButton}
        />

        <Button
          title="Reset / Log Round"
          onPress={handleReset}
          buttonStyle={styles.resetButton}
          titleStyle={styles.resetTitle}
          containerStyle={styles.fullButton}
          type="outline"
        />
      </View>

      {/* Navigation */}
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
    paddingBottom: 12,
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
    backgroundColor: '#1a2a3a',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a5a8c',
  },
  goalText: {
    color: '#5ac8fa',
    fontWeight: '600',
    fontSize: 13,
  },
  timerSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  roundsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  roundsText: {
    color: '#8888aa',
    fontSize: 16,
  },
  roundsNumber: {
    color: '#5ac8fa',
    fontSize: 22,
    fontWeight: '800',
  },
  timerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#1a1a2e',
    borderWidth: 4,
    borderColor: '#2a5a8c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#5ac8fa',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  timerCircleActive: {
    borderColor: '#5ac8fa',
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  timerCircleSuccess: {
    borderColor: '#30d158',
    shadowColor: '#30d158',
  },
  timerText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#ffffff',
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    fontSize: 10,
    color: '#8888aa',
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 4,
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
    backgroundColor: '#5ac8fa',
    borderRadius: 4,
  },
  progressBarSuccess: {
    backgroundColor: '#30d158',
  },
  progressText: {
    color: '#8888aa',
    fontSize: 12,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  fullButton: {
    borderRadius: 16,
  },
  startButton: {
    backgroundColor: '#5ac8fa',
    paddingVertical: 20,
    borderRadius: 16,
  },
  pauseButton: {
    backgroundColor: '#ff6b6b',
  },
  startTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f0f1a',
    letterSpacing: 0.5,
  },
  resetButton: {
    borderColor: '#2a5a8c',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
  },
  resetTitle: {
    color: '#5ac8fa',
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
  suggestedButton: {
    backgroundColor: '#1a2a3a',
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

export default DurationExercise;