import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs/Subject';
import { Exercise } from "./exercise.model";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

    constructor(private db:AngularFireDatabase) {

    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }
    completeExercise() {
        this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancelExercise(progress:number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress/100),
            calories: this.runningExercise.calories * (progress/100),
            date: new Date(),
            state: 'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);

    }
    fetchAvailableExercises() {
      this.db.list('availableExercise').snapshotChanges()
        .map(valueArray => {

          return valueArray.map(value=>{
            return {
              id: value.key,
              // ...value.payload.val() as {}
              name: value.payload.val()['name'],
              calories: value.payload.val()['calories'],
              duration: value.payload.val()['duration']

            }
          })
        })
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        })
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    getAllExercises() {
        return this.exercises.slice();
    }
}
