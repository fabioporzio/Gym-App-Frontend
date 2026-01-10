import { Component, inject, input, output } from '@angular/core';
import { Session } from '../../models/session';
import { Exercise } from '../../models/exercise';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-session-card',
  imports: [FormsModule],
  templateUrl: './session-card.html',
  styleUrl: './session-card.css',
})
export class SessionCard {
  private readonly http = inject(HttpClient);

  session = input.required<Session>();
  deletedSession = output<Session>();
  editedSession = output<Session>();

  exercises: Exercise[] = []
  ngOnInit() {
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

  editMode: boolean = false;
  sessionToEdit: Session = new Session();
  enterEditMode(session: Session) {
    this.editMode = true;
    this.sessionToEdit = session;
  }

  exitEditMode() {
    this.editMode = false;
    this.sessionToEdit = new Session();
  }

  saveSession() {
    /*
    const correct = this.validateForm(this.exerciseToEdit)
    if (!correct) {
      return;
    }
    */

    this.editedSession.emit(this.session());
    this.editMode = false;
    this.sessionToEdit = new Session();
  }

  deleteSession(session: Session): void {
    console.log('Elimina sessione con id:', session.id);
    const confirmed = confirm(`Sei sicuro di voler eliminare questa sessione? 🗑️`);
    if (confirmed) {
      this.deletedSession.emit(this.session());
      return;
    }
  }

  compareExercises(a: Exercise, b: Exercise): boolean {
    if (!a || !b) return false;
    return a.name === b.name && a.muscleGroup === b.muscleGroup;
  }

}
