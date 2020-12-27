import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  @Output()
  trainingStart = new EventEmitter<void>();

  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService
    ) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe((exercises:Exercise[]) => {
      this.exercises = exercises;
    });
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form: NgForm) {

    this.trainingService.startExercise(form.value.exerciseSelect);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
