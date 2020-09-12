import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';

const materialModules = [
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatCardModule,
  MatBadgeModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
