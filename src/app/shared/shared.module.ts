import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Load Library and Services
import { GlobalMatModule } from '../global-mat/global-mat.module';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AddReviewComponent } from './dialog/add-review/add-review.component';

@NgModule({
  declarations: [
    AddReviewComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    GlobalMatModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
  ],
  exports: [
    GlobalMatModule,
  ],
})
export class SharedModule { }
