// screens/Home.js
import { Button } from '@rneui/themed';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import exercises from '../exercises';

const Home = ({ navigation }) => {
  const handleNavigate = (exercise) => {
    if (exercise.type === 'repetition') {
      navigation.navigate('RepetitionExercise', {
        exercise,
        allExercises: exercises,
      });
    } else {
      navigation.navigate('DurationExercise', {
        exercise,
        allExercises: exercises,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.buttonWrapper}>
      <Button
        title={`${item.emoji}  ${item.title}`}
        onPress={() => handleNavigate(item)}
        buttonStyle={[
          styles.exerciseButton,
          item.type === 'duration'
            ? styles.durationButton
            : styles.repetitionButton,
        ]}
        titleStyle={styles.buttonTitle}
        containerStyle={styles.buttonContainer}
        icon={{
          name: item.type === 'duration' ? 'timer-outline' : 'barbell-outline',
          type: 'ionicon',
          color: 'white',
          size: 20,
        }}
        iconRight
      />
      <Text style={styles.typeLabel}>
        {item.type === 'duration' ? '⏱ Duration' : '🔁 Repetition'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🏋️</Text>
        <Text style={styles.headerTitle}>FitTracker</Text>
        <Text style={styles.headerSubtitle}>
          Select an exercise to get started
        </Text>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {exercises.filter((e) => e.type === 'repetition').length}
          </Text>
          <Text style={styles.statLabel}>Rep Exercises</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {exercises.filter((e) => e.type === 'duration').length}
          </Text>
          <Text style={styles.statLabel}>Duration Exercises</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{exercises.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Exercise List */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.listHeader}>Choose Your Exercise</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8888aa',
    marginTop: 4,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#7c6fff',
  },
  statLabel: {
    fontSize: 11,
    color: '#8888aa',
    marginTop: 2,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2a2a4a',
    marginVertical: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8888aa',
    marginTop: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  buttonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  exerciseButton: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  repetitionButton: {
    backgroundColor: '#3d2b7a',
    borderWidth: 1,
    borderColor: '#5a3fa8',
  },
  durationButton: {
    backgroundColor: '#1a3a5c',
    borderWidth: 1,
    borderColor: '#2a5a8c',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  typeLabel: {
    fontSize: 12,
    color: '#8888aa',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Home;