import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output()
  trainingStart = new EventEmitter<void>();

  exercises: Observable<any>;

  constructor(private trainingService: TrainingService,
              private db: AngularFireDatabase
    ) { }

  ngOnInit(): void {

    // this.exercises = this.trainingService.getAvailableExercises();

    // this.db.list('availableExercise').valueChanges().subscribe(result => {
    //   console.log(result);
    // })

    this.exercises = this.db.list('availableExercise').valueChanges();
  }

  onStartTraining(form: NgForm) {

    this.trainingService.startExercise(form.value.exerciseSelect);
  }

}
