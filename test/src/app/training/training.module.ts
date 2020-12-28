import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from '../shared/share.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';

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
        SharedModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}
