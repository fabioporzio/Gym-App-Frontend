import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Exercise } from './models/exercise';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gym-app');

  exercises: Exercise[] = [
    {
      id: 1,
      name: 'Panca piana con bilanciere',
      muscleGroup: 'petto',
      sets: 3,
      reps: 8,
      weightKg: 50,
      notes: 'Focus sulla tecnica, niente rimbalzi'
    },
    {
      id: 2,
      name: 'Lat machine avanti',
      muscleGroup: 'schiena',
      sets: 3,
      reps: 10,
      weightKg: 40,
      notes: 'Tirare al petto senza slanci'
    },
    {
      id: 3,
      name: 'Squat al multipower',
      muscleGroup: 'gambe',
      sets: 4,
      reps: 8,
      weightKg: 60,
      notes: 'Scendere almeno a parallelo'
    },
    {
      id: 4,
      name: 'Curl manubri in piedi',
      muscleGroup: 'bicipiti',
      sets: 3,
      reps: 12,
      weightKg: 10
    },
    {
      id: 5,
      name: 'French press bilanciere EZ',
      muscleGroup: 'tricipiti',
      sets: 3,
      reps: 10,
      weightKg: 25
    },
    {
      id: 6,
      name: 'Plank',
      muscleGroup: 'core',
      sets: 3,
      reps: 30,
      notes: '30 secondi a serie'
    }
  ];

  editMode: boolean = false;
  exerciseToEdit: Exercise = new Exercise();

  insertExercise() {
    this.editMode = true;

  }

  editExercise(exercise: Exercise) {
    this.editMode = true;
    this.exerciseToEdit = exercise

    // fare sempre una validazione anche lato client
    if (!this.exerciseToEdit.name || this.exerciseToEdit.name.trim() === "") {
      alert("IL nome è obbligatorio");
      return;
    }

    // uguale a 0 perchè l'abbiamo inizializzato a zero nel costruttore
    if (this.exerciseToEdit.id === 0) {
      // assegna id progressivo
      this.exerciseToEdit.id = this.exercises.length + 1;

      // inserisco l'esercizio all'array
      this.exercises.push({ ...this.exerciseToEdit });
    }

    this.editMode = false;

    // inizializzo un nuovo oggetto per il form
    this.exerciseToEdit = new Exercise();
  }

  deleteExercise(exercise: Exercise) {
    console.log('Elimina esercizio con id:', exercise.id);
    const confirmed = confirm(`Sei sicuro di voler eliminare questo esercizio? 🗑️`);
    if (confirmed) {
      this.exercises = this.exercises.filter(ex => ex.id !== exercise.id);
      alert('Esercizio eliminato! ✅');
    }
  }

  saveExercise() {
    // fare sempre una validazione anche lato client
    if (!this.exerciseToEdit.name || this.exerciseToEdit.name.trim() === "") {
      alert("IL nome è obbligatorio");
      return;
    }

    // uguale a 0 perchè l'abbiamo inizializzato a zero nel costruttore
    if (this.exerciseToEdit.id === 0) {
      // assegna id progressivo
      this.exerciseToEdit.id = this.exercises.length + 1;

      // inserisco l'esercizio all'array
      this.exercises.push({ ...this.exerciseToEdit });
    }

    this.editMode = false;

    // inizializzo un nuovo oggetto per il form
    this.exerciseToEdit = new Exercise();
  }

  cancelEdit() {
    this.editMode = false;
    this.exerciseToEdit = new Exercise();
  }

}
