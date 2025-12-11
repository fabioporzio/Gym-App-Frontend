//La differenza fra interface e classe è che le interfacce non permettono di avere metodi e/o costruttori all'interno

export class Exercise {
  id: number = 0;  //punto esclamativo indica una proprietà obbligatorio
  name: string = "";
  muscleGroup: string = ""; // per ora semplice stringa: 'petto', 'schiena', ecc.
  sets: number = 0;
  reps: number = 0;
  weightKg?: number; //punto di domanda per indicare le properietà che possono essere null
  notes?: string;
}

