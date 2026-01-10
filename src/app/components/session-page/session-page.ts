import { Component, inject, signal } from '@angular/core';
import { Session } from '../../models/session';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../../models/exercise';
import { Observable } from 'rxjs';
import { ExerciseCard } from '../exercise-card/exercise-card';
import { SessionCard } from '../session-card/session-card';

@Component({
  selector: 'app-session-page',
  imports: [FormsModule, RouterLink, SessionCard],
  templateUrl: './session-page.html',
  styleUrl: './session-page.css',
})
export class SessionPage {
  // protected readonly title = signal('gym-app');
  private readonly http = inject(HttpClient);

  sessions: Session[] = [];
  exercises: Exercise[] = [];
  editMode: Boolean = false;
  async ngOnInit() {
    const storedSessions = localStorage.getItem("sessions")

    if (storedSessions) {
      this.sessions = JSON.parse(storedSessions) as Session[];
    }
    else {
      this.sessions = [];
    }

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

  sessionToEdit: Session = new Session();
  exerciseToEdit: Exercise = new Exercise();
  enterEditMode() {
    this.editMode = true;
  }

  exitEditMode() {
    this.editMode = false;
    this.sessionToEdit = new Session();
  }

  saveSession() {
    if (this.sessionToEdit.id === 0) {
      this.sessionToEdit.id = this.sessions.length + 1;
      this.sessions.push({ ...this.sessionToEdit })
    }

    localStorage.setItem("sessions", JSON.stringify(this.sessions));
    alert('Sessione salvata! ✅');

    this.editMode = false;
    this.sessionToEdit = new Session();
  }

  addExerciseToSession() {
    const splittedExercise = this.exerciseToEdit.name.split("|");
    this.exerciseToEdit.name = splittedExercise[0];
    this.exerciseToEdit.muscleGroup = splittedExercise[1];

    const correct = this.validateSessionForm(this.exerciseToEdit)
    if (!correct) {
      return;
    }

    this.sessionToEdit.exercises.push({ ...this.exerciseToEdit })
  }

  updateExercise(exercise: Exercise) {
    // uguale a 0 perchè l'abbiamo inizializzato a zero nel costruttore
    if (exercise.id === 0) {
      // assegna id progressivo
      exercise.id = this.exercises.length + 1;

      // inserisco l'esercizio all'array
      this.exercises.push({ ...exercise });
    }
  }

  updateSession(session: Session) {
  const newExercises: Exercise[] = [];

  for (const sessionExercise of session.exercises) {

    const correct = this.validateSessionForm(sessionExercise);
    if (!correct) {
      return;
    }

    newExercises.push({
      id: sessionExercise.id,
      name: sessionExercise.name,
      muscleGroup: sessionExercise.muscleGroup,
      sets: sessionExercise.sets,
      reps: sessionExercise.reps,
      weightKg: sessionExercise.weightKg,
      notes: sessionExercise.notes
    });
  }

  session.exercises = newExercises;

  if (session.id === 0) {
    session.id = this.sessions.length + 1;
    this.sessions.push({ ...session });
  }

  localStorage.setItem("sessions", JSON.stringify(this.sessions));
  alert('Sessione Salvata! ✅');
}


  deleteSession(session: Session) {
    this.sessions = this.sessions.filter(ex => ex.id !== session.id);
    localStorage.setItem("sessions", JSON.stringify(this.sessions));
    alert('Sessione eliminata! ✅');
  }

  validateSessionForm(exercise: Exercise) {
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
