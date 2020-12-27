import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output()
  trainingStart = new EventEmitter<void>();

  exercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService,
              private db: AngularFireDatabase
    ) { }

  ngOnInit(): void {

    // this.exercises = this.trainingService.getAvailableExercises();

    // this.db.list('availableExercise').valueChanges().subscribe(result => {
    //   console.log(result);
    // })

    // this.exercises = this.db.list('availableExercise').valueChanges();

    this.exercises = this.db.list('availableExercise').snapshotChanges()
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
    // .subscribe(result => {
    //   console.log(result);
    // });
  }

  onStartTraining(form: NgForm) {

    this.trainingService.startExercise(form.value.exerciseSelect);
  }

}
