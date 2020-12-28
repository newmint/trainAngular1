import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs/Subject';
import { Exercise } from "./exercise.model";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishexercisesChange = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;

    private fbSubs: Subscription[] = [];

    constructor(private db:AngularFireDatabase) {

    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }
    completeExercise() {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancelExercise(progress:number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress/100),
            calories: this.runningExercise.calories * (progress/100),
            date: new Date(),
            state: 'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);

    }
    fetchAvailableExercises() {
      this.fbSubs.push(this.db.list('availableExercise').snapshotChanges()
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
        }));
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    fetchFinishExercises() {
      this.fbSubs.push(this.db.list("finishedExercises").valueChanges().subscribe((finExercises:Exercise[])=>{
        this.finishexercisesChange.next(finExercises);
      }));
    }

    addDataToDatabase(exercise: Exercise) {
      
      //วันที่ไม่มาด้วยเลยต้องทำแบบนี้ 
      //จริงๆแล้วไม่ควรต้องทำนะ
      const param = JSON.parse(JSON.stringify(exercise));
      this.db.list("finishedExercises").push(param);
    }

    cancelSubscription() {
      this.fbSubs.forEach(sub => sub.unsubscribe());
    }
}
