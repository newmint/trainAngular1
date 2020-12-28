import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

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

  isLoading = true;
  private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private uiService: UIService
    ) { }

  ngOnInit(): void {

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoad=>{
      this.isLoading = isLoad;
    })

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe((exercises:Exercise[]) => {
      this.exercises = exercises;
    });
    this.fetchExercise();
  }
  
  fetchExercise() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {

    this.trainingService.startExercise(form.value.exerciseSelect);
  }

  ngOnDestroy() {
    if(this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();

    if(this.loadingSubscription)
      this.loadingSubscription.unsubscribe();
  }

}
