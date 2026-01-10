import { Component, input, output } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-exercise-card',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './exercise-card.html',
  styleUrl: './exercise-card.css',
})
export class ExerciseCard {
  exercise = input.required<Exercise>();
  deletedExercise = output<Exercise>();
  editedExercise = output<Exercise>();

  editMode: boolean = false;
  exerciseToEdit: Exercise = new Exercise();
  enterEditMode(exercise: Exercise) {
    this.editMode = true;
    this.exerciseToEdit = exercise;
  }

  exitEditMode() {
    this.editMode = false;
    this.exerciseToEdit = new Exercise();
  }

  saveExercise() {
    // fare sempre una validazione anche lato client
    const correct = this.validateForm(this.exerciseToEdit)
    if (!correct) {
      return;
    }

    this.editedExercise.emit(this.exercise());
    this.editMode = false;
    this.exerciseToEdit = new Exercise();
  }

  deleteExercise(exercise: Exercise): void {
    console.log('Elimina esercizio con id:', exercise.id);
    const confirmed = confirm(`Sei sicuro di voler eliminare questo esercizio? 🗑️`);
    if (confirmed) {
      this.deletedExercise.emit(this.exercise());
      return;
    }
  }

  validateForm(exercise: Exercise): boolean {
    if (!exercise.name || exercise.name.trim() === "") {
      alert("Il nome è obbligatorio");
      return false;
    }

    if (!exercise.muscleGroup || exercise.muscleGroup.trim() === "") {
      alert("Il gruppo muscolare è obbligatorio");
      return false;
    }

    if (!exercise.sets) {
      alert("Il numero di serie è obbligatorio");
      return false;
    }

    if (!exercise.reps) {
      alert("Il numero di ripetizioni è obbligatorio");
      return false;
    }

    return true;
  }
}
