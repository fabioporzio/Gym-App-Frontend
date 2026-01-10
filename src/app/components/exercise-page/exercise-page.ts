import { Component, inject } from '@angular/core';
import { ExerciseCard } from '../exercise-card/exercise-card';
import { Exercise } from '../../models/exercise';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-page',
  imports: [ExerciseCard, FormsModule],
  templateUrl: './exercise-page.html',
  styleUrl: './exercise-page.css',
})
export class ExercisePage {
  private readonly http = inject(HttpClient);

  exercises: Exercise[] = [];
  exerciseToEdit: Exercise = new Exercise();
  editMode: boolean = false;
  async ngOnInit() {
    const storderExercises = localStorage.getItem("exercises");

    if (storderExercises) {
      this.exercises = JSON.parse(storderExercises) as Exercise[];
    }
    else {
      this.loadExercisesFromJson().subscribe(cachedExercises => {
        this.exercises = cachedExercises;

        localStorage.setItem("exercises", JSON.stringify(this.exercises));
      });
    }
  }

  loadExercisesFromJson(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>("/materials/exercises.json")
  }

  enterEditMode() {
    this.editMode = true;
  }

  exitEditMode() {
    this.editMode = false;
    this.exerciseToEdit = new Exercise();
  }

  saveExercise() {
    const correct = this.validateForm(this.exerciseToEdit)
    if (!correct) {
      return;
    }

    // uguale a 0 perchè l'abbiamo inizializzato a zero nel costruttore
    if (this.exerciseToEdit.id === 0) {
      // assegna id progressivo
      this.exerciseToEdit.id = this.exercises.length + 1;

      // inserisco l'esercizio all'array
      this.exercises.push({ ...this.exerciseToEdit });
    }

    localStorage.setItem("exercises", JSON.stringify(this.exercises));
    alert('Esercizio Salvato! ✅');
  }

  updateExercise(exercise: Exercise) {
    // uguale a 0 perchè l'abbiamo inizializzato a zero nel costruttore
    if (exercise.id === 0) {
      // assegna id progressivo
      exercise.id = this.exercises.length + 1;

      // inserisco l'esercizio all'array
      this.exercises.push({ ...exercise });
    }

    localStorage.setItem("exercises", JSON.stringify(this.exercises));
    alert('Esercizio Salvato! ✅');
  }

  deleteExercise(exercise: Exercise) {
    this.exercises = this.exercises.filter(ex => ex.id !== exercise.id);
    localStorage.setItem("exercises", JSON.stringify(this.exercises));
    alert('Esercizio eliminato! ✅');
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
