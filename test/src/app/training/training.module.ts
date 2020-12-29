import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from '../shared/share.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        AngularFireDatabaseModule,
        SharedModule,
        TrainingRoutingModule,
        //คล้ายๆ กับที่ประกาศไว้ที่ app.reducer
        //พอทำ lazy load เลยมาไว้ที่นี่แทน
        StoreModule.forFeature('training', trainingReducer)
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}
