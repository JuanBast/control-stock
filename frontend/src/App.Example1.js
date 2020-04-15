import React, { Component } from 'react'

import Exercises from './Example1/components/Exercises'
import { Header, Footer } from './Example1/components/Layouts'
import { muscles, exercises } from './Example1/store'

class App extends Component {

  state = {
    exercises,
    exercise: {}
  }

  getExercisesByMuscles() {
    const initExercises = muscles.reduce((exercises, category) => ({
      ...exercises,
      [category]: []
    }), {})

    return Object.entries(
      this.state.exercises.reduce((accumulator, currentValue) => {
        const { muscles } = currentValue;

        accumulator[muscles] = [...accumulator[muscles], currentValue]

        return accumulator
      }, initExercises)
    )
  }

  handleCategorySelected = category =>
    this.setState({
      category
    })

  handleExerciseSelected = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }))

  handleExerciseCreated = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [
        ...exercises,
        exercise
      ]
    }))

  handleExerciseDeleted = id =>
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }))

  handleExerciseSelectedEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }))
  
  handleExerciseEdited = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [
        ...exercises.filter(ex => ex.id !== exercise.id),
        exercise
      ],
      exercise
    }))

  render() {
    const exercises = this.getExercisesByMuscles(),
          { category, exercise, editMode } = this.state
    return (
      <React.Fragment>
        <Header 
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreated}
        />
        <Exercises 
          muscles={muscles}
          category={category}
          exercises={exercises}
          exercise={exercise}
          onSelect={this.handleExerciseSelected}
          onDelete={this.handleExerciseDeleted}
          onSelectEdit={this.handleExerciseSelectedEdit}
          onEdit={this.handleExerciseEdited}
          editMode={editMode}
        />
        <Footer 
          category={category}
          muscles={muscles} 
          onSelected={this.handleCategorySelected}
        />
      </React.Fragment>
    );
  }
}

export default App;
