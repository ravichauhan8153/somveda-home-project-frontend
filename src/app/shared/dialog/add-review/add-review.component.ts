import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent {
  selectedRating: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddReviewComponent>
  ) {}
  onRateChange(event: any) {
    this.selectedRating = parseInt(event.target.value);
  }

  save() {
    this.dialogRef.close(this.selectedRating);
  }

  close() {
    this.dialogRef.close();
  }
}
