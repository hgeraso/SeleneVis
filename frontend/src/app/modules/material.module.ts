import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatListModule
  ],
  exports:[    
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatListModule
  ]
})
export class MaterialModule { }
