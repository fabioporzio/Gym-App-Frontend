import { Routes } from '@angular/router';
import { ExercisePage } from './components/exercise-page/exercise-page';
import { Home } from './components/home/home';
import { SessionPage } from './components/session-page/session-page';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        title: "Gym App Homepage"
    },
    {
        path: "exercises",
        component: ExercisePage,
        title: "Your exercises"
    },
    {
        path: "sessions",
        component: SessionPage,
        title: "Your sessions"
    }
];
