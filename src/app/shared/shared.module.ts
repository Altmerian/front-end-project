import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
