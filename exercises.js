// exercises.js - Central data store for all exercises

const exercises = [
    {
      id: '1',
      title: 'Push-Ups',
      type: 'repetition',
      description: 'Classic upper body strength exercise',
      emoji: '💪',
      suggestedCount: 15,
      suggestedExercise: { id: '2', title: 'Sit-Ups', type: 'repetition' },
    },
    {
      id: '2',
      title: 'Sit-Ups',
      type: 'repetition',
      description: 'Core strengthening exercise',
      emoji: '🔥',
      suggestedCount: 20,
      suggestedExercise: { id: '3', title: 'Squats', type: 'repetition' },
    },
    {
      id: '3',
      title: 'Squats',
      type: 'repetition',
      description: 'Lower body powerhouse move',
      emoji: '🦵',
      suggestedCount: 20,
      suggestedExercise: { id: '4', title: 'Lunges', type: 'repetition' },
    },
    {
      id: '4',
      title: 'Lunges',
      type: 'repetition',
      description: 'Balance and leg strength',
      emoji: '🏃',
      suggestedCount: 12,
      suggestedExercise: { id: '1', title: 'Push-Ups', type: 'repetition' },
    },
    {
      id: '5',
      title: 'Plank',
      type: 'duration',
      description: 'Full body isometric hold',
      emoji: '⏱️',
      suggestedDuration: 60,
      suggestedExercise: { id: '6', title: 'Wall Sit', type: 'duration' },
    },
    {
      id: '6',
      title: 'Wall Sit',
      type: 'duration',
      description: 'Quad endurance challenge',
      emoji: '🧱',
      suggestedDuration: 45,
      suggestedExercise: { id: '5', title: 'Plank', type: 'duration' },
    },
  ];
  
  export default exercises;