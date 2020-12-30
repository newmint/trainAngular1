import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Exercise } from "./exercise.model";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import { take } from 'rxjs/operators'

//เปลี่ยนมาเรียก จาก training แทน ตัวเก่าไม่กระทบเพราะ State extends มาจาก app.reducer
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {

    private fbSubs: Subscription[] = [];

    constructor(private db:AngularFireDatabase,
                private uiService: UIService,
                private store: Store<fromTraining.State>
      ) {

    }

    startExercise(selectedId: string) {
        // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        // this.exerciseChanged.next({...this.runningExercise});
        
        this.store.dispatch(new Training.StartTraining(selectedId));
    }
    completeExercise() {
      //เค้าว่าต้องใส่ take ไม่งั้นจะได้มาเยอะไป 
      this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
        
        this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
        this.store.dispatch(new Training.StopTraining);
      })
    }
    cancelExercise(progress:number) {
      //เค้าว่าต้องใส่ take ไม่งั้นจะได้มาเยอะไป 
      this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
        
        this.addDataToDatabase({
            ...ex,
            duration: ex.duration * (progress/100),
            calories: ex.calories * (progress/100),
            date: new Date(),
            state: 'cancelled'});
        this.store.dispatch(new Training.StopTraining);
      })
    }
    fetchAvailableExercises() {

      // this.uiService.loadingStateChanged.next(true);
      this.store.dispatch(new UI.StartLoading);

      this.fbSubs.push(this.db.list('availableExercise').snapshotChanges()
        .map(valueArray => {

          // throw(new Error());
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
          this.store.dispatch(new UI.StopLoading);
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        },error=>{
          this.store.dispatch(new UI.StopLoading);
          this.uiService.showSnackbar("Fetch Exercise Fail, Try Later",null, 3000);
        }));
    }
    
    fetchFinishExercises() {
      this.fbSubs.push(this.db.list("finishedExercises").valueChanges().subscribe((finExercises:Exercise[])=>{
        // this.finishexercisesChange.next(finExercises);
        this.store.dispatch(new Training.SetFinishedTrainings(finExercises));
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
